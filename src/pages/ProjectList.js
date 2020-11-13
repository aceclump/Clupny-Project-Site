import React from 'react';
import ContentBackground from '../components/ContentBackground.js'
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import ProjectListContent from '../components/ProjectListContent.js';
import './css/ProjectList.scss'

function ProjectList() {
  return (
    <div className="ProjectList">
      <Header />
      <Sidebar />
      <ContentBackground />
      <ProjectListContent />
    </div>
  );
}

export default ProjectList; 