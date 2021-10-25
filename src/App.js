import { Layout, Menu, Breadcrumb } from 'antd';
import RAM from './graphs/ram.png';
import CPU from './graphs/cpu.png';
import LUCID_LOGO from './graphs/logo.png';
import { useState, useEffect } from 'react';
const { Header, Content, Footer } = Layout;
//var shell = require('shelljs');



function App() {
  const [numUsers, setNumUsers] = useState(0);

  
  
  useEffect(async() => {      
    
  });


  return (
    <Layout className="layout">
    <Header>
      {/* <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "40px"}}>Dashboard</h1> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={LUCID_LOGO}  /> 
      </div>
    </Header>
    <br/>
    <br/>
    <br/>
    <Content style={{ padding: '0 50px' }}>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "20px"}}><b style={{ fontSize: "35px"}}> Bender 0&nbsp;</b> **4 Users**</span>
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