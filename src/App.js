import { Layout } from 'antd';
import LUCID_LOGO from './graphs/logo.png';
import METRICS_0 from './graphs/metrics-bender-0.lucid.local.csv';
import METRICS_1 from './graphs/metrics-bender-1.lucid.local.csv';
import METRICS_2 from './graphs/metrics-bender-2.lucid.local.csv';
import METRICS_3 from './graphs/metrics-bender-3.lucid.local.csv';
import METRICS_4 from './graphs/metrics-bender-4.lucid.local.csv';
import METRICS_5 from './graphs/metrics-bender-5.lucid.local.csv';
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
  useEffect(() => {
    async function fetchData() {
        await generateGraphData(METRICS_0, 'bender0ram', 'bender0cpu', 'output0', 'users0');  // bender 0 graphs
        await generateGraphData(METRICS_1, 'bender1ram', 'bender1cpu', 'output1', 'users1');  // bender 1 graphs
        await generateGraphData(METRICS_2, 'bender2ram', 'bender2cpu', 'output2', 'users2');  // bender 2 graphs
        await generateGraphData(METRICS_3, 'bender3ram', 'bender3cpu', 'output3', 'users3');  // bender 3 graphs
        await generateGraphData(METRICS_4, 'bender4ram', 'bender4cpu', 'output4', 'users4');  // bender 4 graphs
        await generateGraphData(METRICS_5, 'bender5ram', 'bender5cpu', 'output5', 'users5');  // bender 5 graphs
      }
      fetchData();
      //window.location.reload(false);
    },
  ); 

  const loadGraphDataWithPromise = (metrics) => {  // Grab data from CSV file in JSON format
    return d3.csv(metrics)
  }

  async function generateGraphData(metrics, firstChartID, secondChartID, numUserID, userListID) {  // Store JSON data into arrays (using graph.js functions)
    loadGraphDataWithPromise(metrics).then((data) => { 
      import("./graph").then(graph => {
        let graphData = graph.processGraphData(data);
        let allUserRamUsage = graphData[0];
        let allUserCpuUsage = graphData[1];
        let currentTimePeriod = graphData[2];
        let numberOfUsers = graphData[3];
        let virtualUsers = graphData[4];

        let usersList = "<table><tr>";
        for (let i = 0; i < virtualUsers.length; i++) {
          usersList += `<td id="user"> ${virtualUsers[i]} </td>`;
          usersList += `<td id="user"> &#9;</td>`;
        }
        usersList += "</tr></table>";
        document.getElementById(userListID).innerHTML=usersList;  // Set list of users in HTML
        document.getElementById(numUserID).textContent=numberOfUsers;  // Set number of users in HTML

        generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB');  // RAM Usage Graph
        generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%');  // CPU Usage Graph
      });
    })
  }

  function generateGraphs(dataset, xAxis, id, units) {  // Create Graphs
    const ctx = document.getElementById(id).getContext('2d');

    if (window.myChart1 != null) {
      window.myChart1.update();
    }
    
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
      <span id="bender-title"><b> Bender 0&nbsp;</b> **<span id="output0"></span> &nbsp;User(s)**</span>
      <div id="users0"></div>
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
      
      
      <span id="bender-title"><b> Bender 1&nbsp;</b> **<span id="output1"></span> &nbsp;User(s)**</span>
      <div id="users1"></div>
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
      </div>
      <div id="big-div"></div>
      
      <span id="bender-title"><b> Bender 2&nbsp;</b> **<span id="output2"></span> &nbsp;User(s)**</span>
      <div id="users2"></div>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender2ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender2cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <div id="big-div"></div>


      <span id="bender-title"><b> Bender 3&nbsp;</b> **<span id="output3"></span> &nbsp;User(s)**</span>
      <div id="users3"></div>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender3ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender3cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <div id="big-div"></div>


      <span id="bender-title"><b> Bender 4&nbsp;</b> **<span id="output4"></span> &nbsp;User(s)**</span>
      <div id="users4"></div>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender4ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender4cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <div id="big-div"></div>


      <span id="bender-title"><b> Bender 5&nbsp;</b> **<span id="output5"></span> &nbsp;User(s)**</span>
      <div id="users5"></div>
      <hr/>
      <div id="small-div"></div>
      <div className="site-layout-content">
        <div id="centered-div">
          <h2>RAM Usage:&nbsp;</h2>
          <canvas id="bender5ram" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="med-div"></div>
        <div id="centered-div">
          <h2>CPU Usage:&nbsp;</h2> 
          <canvas id="bender5cpu" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
        <div id="small-div"></div>
        <hr/>
        <div id="med-div"></div>
      </div>
    </Content>
    <Footer>Lucid Circuit ©2021 Created by Forrest Burton</Footer>
  </Layout>
  );
}

export default App;