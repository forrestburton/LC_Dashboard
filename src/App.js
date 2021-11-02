import { Layout } from 'antd';
//import RAM_GRAPH from './graphs/ram.png';
//import CPU_GRAPH from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import NUM_USERS from './graphs/users.txt';
import METRICS from './graphs/metrics.csv';
import { useEffect } from 'react';
import * as d3 from "d3";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
const { Header, Content, Footer } = Layout;

function App() {

  function getNumUsers() {
    // Read contents of users.txt, which contains the number of users on the bender 
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", NUM_USERS, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                //console.log(allText);
                document.getElementById('output').textContent=allText;  // Set number of users in HTML
                
            }
        }
    }
    rawFile.send(null);
  }

  // Grab data from CSV file in JSON format
  const loadGraphDataWithPromise = () => {
    return d3.csv(METRICS)
  }

  // Store JSON data into arrays
  async function generateGraphData() {
    loadGraphDataWithPromise().then((data) => { 
      let currentUsersOnline = [];
      let currentRamUsage = [];
      let currentCpuUsage = [];
      let currentTimePeriod = [];
      let allUserRamUsage = [];
      let allUserCpuUsage = [];
      let numberOfUsers = 0;
      var pointColor;
      var lineColor;

      // Color scheme for graphs
      for (let i = 0; i < data.length; i++) {
        var user = data[i].User;  // get current user
        switch (numberOfUsers) {  // Can assume 6 benders for now 
          case 0:
            pointColor = 'rgba(255, 99, 132, 0.5)';
            lineColor = 'rgba(255, 99, 132, 1)';
            break;
          case 1:
            pointColor = 'rgba(0, 206, 209, 0.5)';
            lineColor = 'rgba(0, 206, 209, 1)';
            break;
          case 2:
            pointColor = 'rgba(102,167,197, 0.5)';
            lineColor = 'rgba(102,167,197, 1)';
            break;
          case 3:
            pointColor = 'rgba(182, 119, 33, 0.5)';
            lineColor = 'rgba(182, 119, 33, 1)';
            break;
          case 4:
            pointColor = 'rgba(191, 122, 160, 0.5)';
            lineColor = 'rgba(191, 122, 160, 1)';
            break;
          case 5:
            pointColor = 'rgba(0, 0, 0, 0.5)';
            lineColor = 'rgba(0, 0, 0, 1)';
            break;
          default:
            pointColor = 'rgba(0, 0, 0, 0.5)';
            lineColor = 'rgba(0, 0, 0, 1)';
            break;
        }

         // Store JSON data into arrays
        if (i !== 0 && user !== currentUsersOnline[numberOfUsers]) {  // determine if this is a new user, and therefore a new dataset
          allUserRamUsage.push(  // push RAM data for this user
            {
              label: currentUsersOnline[numberOfUsers],  // name of user
              data: currentRamUsage,  //y-axis
              backgroundColor: pointColor,
              borderColor: lineColor,
              borderWidth: 1
            }
          )
          allUserCpuUsage.push(  // push CPU data for this user
            {
              label: currentUsersOnline[numberOfUsers],  // name of user
              data: currentCpuUsage,  //y-axis
              backgroundColor: pointColor,
              borderColor: lineColor,
              borderWidth: 1
            }
          )
          numberOfUsers += 1

          // clear datasets for next user
          currentRamUsage = []
          currentCpuUsage = []
        }
        currentUsersOnline[numberOfUsers] = user;
        currentTimePeriod.push(data[i].Time)
        currentRamUsage.push(data[i].RAM)
        currentCpuUsage.push(data[i].CPU)
      }

      // Push data one more time for last iteration 
      allUserRamUsage.push(  // push RAM data for this user
        {
          label: currentUsersOnline[numberOfUsers],  // name of user
          data: currentRamUsage,  //y-axis
          backgroundColor: pointColor,
          borderColor: lineColor,
          borderWidth: 1
        }
      )
      allUserCpuUsage.push(  // push CPU data for this user
        {
          label: currentUsersOnline[numberOfUsers],  // name of user
          data: currentCpuUsage,  //y-axis
          backgroundColor: pointColor,
          borderColor: lineColor,
          borderWidth: 1
        }
      )
      //console.log("PRINTING RAM: ")
      //console.log(allUserRamUsage)

      generateGraphs(allUserRamUsage, currentTimePeriod, 'myChart1', 'GB')
      generateGraphs(allUserCpuUsage, currentTimePeriod, 'myChart2', '%')
    })
  }

  function generateGraphs(dataset, xAxis, id, units) {
    // Create Graphs
    const ctx = document.getElementById(id).getContext('2d');

    // if(window.myChart1 != null){
    //   window.myChart1.destroy();
    // }
    
    window.myChart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xAxis,  // x-axis
        datasets: dataset
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value, index, values) {
                        return value + units;
                    }
                }
              }
          }
        }
    });
  }

  useEffect(() => {
    async function fetchData() {
      await getNumUsers();
      await generateGraphData();
    }
    fetchData();
  },); 

  return (
    <Layout className="layout">
    <Header>
    <br/>
    <br/>
    <br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={LUCID_LOGO} alt="Loading"/> 
      </div>
    </Header>
    <br/>
    <br/>
    <br/>
    <Content style={{ padding: '0 200px' }}>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "20px"}}><b style={{ fontSize: "35px"}}> Bender 0&nbsp;</b> **<span id="output"></span> &nbsp;User(s)**</span>
      <hr/>
      <br/>
      <br/>
      <br/>
      <div className="site-layout-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>RAM Usage:&nbsp; </h2>
          <canvas id="myChart1" style={{ width: "100%", height: "100%" }}></canvas>
          {/* <img src={RAM_GRAPH} style={{ width: 800}} />  */}
        </div>
        <br/>
        <br/>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>CPU Usage:&nbsp;  </h2> 
          <canvas id="myChart2" style={{ width: "100%", height: "100%" }}></canvas>
          {/* <img src={CPU_GRAPH} style={{ width: 800}} /> */}
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <hr/>
      <br/>
      <br/>
      <br/>
      <br/>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Lucid Circuit ©2021 Created by Forrest Burton</Footer>
  </Layout>
  );
}

export default App;