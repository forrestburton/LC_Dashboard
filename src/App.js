import { Layout } from 'antd';
//import RAM_GRAPH from './graphs/ram.png';
//import CPU_GRAPH from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import METRICS_0 from './graphs/metrics-bender-0.lucid.local.csv';
import METRICS_1 from './graphs/metrics-bender-1.lucid.local.csv';
import NUM_USERS from './graphs/users.txt';
import { useEffect } from 'react';
import * as d3 from "d3";
import "./App.css";
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

  const loadGraphDataWithPromise = (metrics) => {  // Grab data from CSV file in JSON format
    return d3.csv(metrics)
  }

  async function generateGraphData(metrics, firstChartID, secondChartID) {  // Store JSON data into arrays (using graph.js functions)
    loadGraphDataWithPromise(metrics).then((data) => { 
      import("./graph").then(graph => {
        let graphData = graph.processGraphData(data);
        let allUserRamUsage = graphData[0]
        let allUserCpuUsage = graphData[1]
        let currentTimePeriod = graphData[2]

        generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB');  // RAM Usage Graph
        generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%');  // CPU Usage Graph
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
        await getNumUsers();  //bender 0
        await generateGraphData(METRICS_0, 'bender0ram', 'bender0cpu');  // bender 0 
        await generateGraphData(METRICS_1, 'bender1ram', 'bender1cpu');  // bender 1
      }
      fetchData();
    },
  ); 

  return (
    <Layout className="layout">
    <head>
      <title>Lucid Circuits Dashboard</title>
    </head>
    <Header>
      <div id="med-div"></div>
      <div id="centered-div">
        <img src={LUCID_LOGO} alt="Loading"/> 
      </div>
    </Header>
    <div id="med-div"></div>
    <Content style={{ padding: '0 200px' }}>
      <span id="bender-title"><b> Bender 0&nbsp;</b> **<span id="output"></span> &nbsp;User(s)**</span>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender0ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender0cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <div id="big-div"></div>
      <span id="bender-title"><b> Bender 1&nbsp;</b> **<span id="output"></span> &nbsp;User(s)**</span>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender1ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender1cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="small-div"></div>
        <hr/>
        <div id="med-div"></div>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Lucid Circuit ©2021 Created by Forrest Burton</Footer>
  </Layout>
  );
}

export default App;