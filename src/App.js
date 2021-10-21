import { Layout, Menu, Breadcrumb } from 'antd';
import RAM from './graphs/ram.png';
const { Header, Content, Footer } = Layout;
//import CPU from './graphs/cpu.png';

function App() {
  return (
    <Layout className="layout">
    <Header>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Dashboard</h1>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        <img src={RAM} display/>  
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Lucid Circuit ©2021 Created by Forrest Burton</Footer>
  </Layout>
  );
}

export default App;