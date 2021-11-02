import { Layout } from 'antd';
//import RAM_GRAPH from './graphs/ram.png';
//import CPU_GRAPH from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import METRICS from './graphs/metrics-forrest.csv';
import NUM_USERS from './graphs/users.txt';
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
  function getNumUsers() {  // Read contents of users.txt, which contains the number of users on the bender 
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", NUM_USERS, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0) {
              var numberOfUsers = rawFile.responseText;
              document.getElementById('output').textContent=numberOfUsers;  // Set number of users in HTML
            }
        }
    }
    rawFile.send(null);
  }

  const loadGraphDataWithPromise = () => {  // Grab data from CSV file in JSON format
    return d3.csv(METRICS)
  }

  async function generateGraphData() {  // Store JSON data into arrays
    loadGraphDataWithPromise().then((data) => { 
      import("./graph").then(graph => {
        let graphData = graph.processGraphData(data);
        let allUserRamUsage = graphData[0]
        let allUserCpuUsage = graphData[1]
        let currentTimePeriod = graphData[2]

        generateGraphs(allUserRamUsage, currentTimePeriod, 'myChart1', 'GB');
        generateGraphs(allUserCpuUsage, currentTimePeriod, 'myChart2', '%');
      });
    })
  }

  function generateGraphs(dataset, xAxis, id, units) {  // Create Graphs
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
    },
  ); 

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