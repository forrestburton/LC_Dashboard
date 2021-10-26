import { Layout } from 'antd';
import RAM_GRAPH from './graphs/ram.png';
import CPU_GRAPH from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import NUM_USERS from './graphs/users.txt';
import METRICS from './graphs/metrics.csv';
import { useEffect, useState } from 'react';
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
  const [dataTime, setDataTime] = useState([]);
  const [dataRAM, setDataRAM] = useState([]);
  const [dataCPU, setDataCPU] = useState([]);

  function getNumUsers() {
    // Read contents of users.txt, which contains the number of users on the bender 
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", NUM_USERS, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                document.getElementById('output').textContent=allText;  // Set number of users in HTML
                
            }
        }
    }
    rawFile.send(null);
  }

  function generateGraphData() {
    let data_Time = []
    let data_RAM = []
    let data_CPU = []

    // Get Graph Data
    d3.csv(METRICS, function(data) {
      //console.log(data)
      //console.log(data.Time)
      let curr_time = data.Time;
      data_Time.push(curr_time);

      let curr_RAM = data.RAM;
      data_RAM.push(parseFloat(curr_RAM));

      let curr_CPU = data.CPU;
      data_CPU.push(curr_CPU);
    });
    console.log(data_Time)
    console.log(data_CPU)
    console.log(data_RAM);

    setDataTime(data_Time);
    setDataRAM(data_RAM);
    setDataCPU(data_CPU);
  }

  function generateGraphs() {
    // Create Graphs
    const ctx = document.getElementById('myChart').getContext('2d');

    if(window.myChart1 != null){
      window.myChart1.destroy();
    }
    
    if (dataRAM.length > 0) {
      window.myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9,10],  // x-axis
            datasets: [{
                label: 'RAM Usage by User',
                data: dataRAM,  //y-axis
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value + ' GB';
                      }
                  }
                }
            }
          }
      });
    }
    else {
      console.log("Data not fully loaded")
    }
  }

  useEffect(async() => {      
    getNumUsers();
    generateGraphData();
  });


  if (dataRAM.length > 0) {
    generateGraphs();
    //return ..
  }
  else {
    //return...
  }
  return (
    <Layout className="layout">
    <Header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={LUCID_LOGO} /> 
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
          <h2>RAM Usage:  </h2>
          <canvas id="myChart" style={{ width: "100%", height: "100%" }}></canvas>
          {/* <img src={RAM_GRAPH} style={{ width: 800}} />  */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>CPU Usage:  </h2> 
          <img src={CPU_GRAPH} style={{ width: 800}} />
        </div>
      </div>
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