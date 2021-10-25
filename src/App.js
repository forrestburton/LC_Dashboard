import { Layout } from 'antd';
import RAM from './graphs/ram.png';
import CPU from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import NUM_USERS from './graphs/users.txt';
import { useEffect } from 'react';
const { Header, Content, Footer } = Layout;


function App() {
  
  useEffect(async() => {      
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
    <Content style={{ padding: '0 50px' }}>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "20px"}}><b style={{ fontSize: "35px"}}> Bender 0&nbsp;</b> **<span id="output"></span> &nbsp;User(s)**</span>
      <hr/>
      <div className="site-layout-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>RAM Usage:  </h2>
          <img src={RAM} style={{ width: 800}} /> 
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