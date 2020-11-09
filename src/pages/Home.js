import React from 'react';
import HeaderHome from '../components/HeaderHome.js'
import Sidebar from '../components/Sidebar.js'
import ContentBackground from '../components/ContentBackground.js'
import "./css/Home.scss"

function Home() {
  return (
    <div class="Home">
      <HeaderHome />
      <Sidebar />
      <ContentBackground />
    </div>
    
  );
}

export default Home;