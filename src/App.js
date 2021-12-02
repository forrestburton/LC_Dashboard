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
var myChart0Ram = null;
var myChart1Ram = null;
var myChart2Ram = null;
var myChart3Ram = null;
var myChart4Ram = null;
var myChart5Ram = null;
var myChart0Cpu = null;
var myChart1Cpu = null;
var myChart2Cpu = null;
var myChart3Cpu = null;
var myChart4Cpu = null;
var myChart5Cpu = null;

function App() {
  useEffect(() => {
    
    async function fetchData() {
        await generateGraphData(METRICS_0, 'bender0ram', 'bender0cpu', 'users0', 0);  // bender 0 graphs
        await generateGraphData(METRICS_1, 'bender1ram', 'bender1cpu', 'users1', 1);  // bender 1 graphs
        await generateGraphData(METRICS_2, 'bender2ram', 'bender2cpu', 'users2', 2);  // bender 2 graphs
        await generateGraphData(METRICS_3, 'bender3ram', 'bender3cpu', 'users3', 3);  // bender 3 graphs
        await generateGraphData(METRICS_4, 'bender4ram', 'bender4cpu', 'users4', 4);  // bender 4 graphs
        await generateGraphData(METRICS_5, 'bender5ram', 'bender5cpu','users5', 5);  // bender 5 graphs
      }
      fetchData();
    },
  ); 

  const loadGraphDataWithPromise = (metrics) => {  // Grab data from CSV file in JSON format
    return d3.csv(metrics)
  }

  async function generateGraphData(metrics, firstChartID, secondChartID, userListID, chartID) {  // Store JSON data into arrays (using graph.js functions)
    loadGraphDataWithPromise(metrics).then((data) => { 
      import("./graph").then(graph => {
        let graphData = graph.processGraphData(data);
        let allUserRamUsage = graphData[0];
        let allUserCpuUsage = graphData[1];
        let currentTimePeriod = graphData[2];
        let virtualUsers = graphData[3];

        let usersList = "<table><tr><td><b><u>Users:</u></b></td>";
        for (let i = 0; i < virtualUsers.length; i++) {
          usersList += `<td id="user"> ${virtualUsers[i]} </td>`;
          usersList += `<td id="user"> &#9;</td>`;
        }
        usersList += "</tr></table>";
        document.getElementById(userListID).innerHTML=usersList;  // Set list of users in HTML

        switch (chartID) {
          case 0:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart0Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart0Cpu);  // CPU Usage Graph
            break;
          case 1:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart1Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart1Cpu);  // CPU Usage Graph
            break;
          case 2:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart2Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart2Cpu);  // CPU Usage Graph
            break;
          case 3:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart3Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart3Cpu);  // CPU Usage Graph
            break;
          case 4:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart4Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart4Cpu);  // CPU Usage Graph
            break;
          case 5:
            generateGraphs(allUserRamUsage, currentTimePeriod, firstChartID, 'GB', myChart5Ram);  // RAM Usage Graph
            generateGraphs(allUserCpuUsage, currentTimePeriod, secondChartID, '%', myChart5Cpu);  // CPU Usage Graph
            break;
          default:
        }
      });
    })
  }

  function generateGraphs(dataset, xAxis, id, units, chartName) {  // Create Graphs
    const ctx = document.getElementById(id).getContext('2d');

    if (chartName) {
      console.log("Got IN!")
      chartName.destroy();
    }
    
    chartName = new Chart(ctx, {
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
      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 0&nbsp;</b> </span>
        <div id="users0"></div>
      </div>
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
      
      
      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 1&nbsp;</b> </span>
        <div id="users1"></div>
      </div>
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
      
      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 2&nbsp;</b> </span>
        <div id="users2"></div>
      </div>
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


      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 3&nbsp;</b> </span>
        <div id="users3"></div>
      </div>
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


      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 4&nbsp;</b> </span>
        <div id="users4"></div>
      </div>
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


      <div id="header-div">
        <span id="bender-title"><b id="bender"> Bender 5&nbsp;</b> </span>
        <div id="users5"></div>
      </div>
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