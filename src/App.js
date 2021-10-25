import { Layout } from 'antd';
import RAM from './graphs/ram.png';
import CPU from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import NUM_USERS from './graphs/users.txt';
import { useEffect } from 'react';
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

  function generateGraphs() {
    const ctx = document.getElementById('myChart').getContext('2d');

    if(window.myChart1 != null){
      window.myChart1.destroy();
    }
    
    window.myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],  // x-axis
            datasets: [{
                
                label: 'RAM Usage by User',
                data: [12, 19, 3, 5, 2, 3],  //y-axis
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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

  useEffect(async() => {      
    getNumUsers();
    generateGraphs();
  });

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
          {/* <img src={RAM} style={{ width: 800}} />  */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>CPU Usage:  </h2> 
          <img src={CPU} style={{ width: 800}} />
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