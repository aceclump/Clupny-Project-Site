import React from 'react';
import ContentBackground from '../components/ContentBackground.js';
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import ProjectPageContent from '../components/ProjectPageContent.js';
import './css/ProjectPage.scss'

function ProjectPage(props) {
  return (
    <div className="ProjectPage">
      <Header />
      <Sidebar />
      <ContentBackground />
      <ProjectPageContent id={props.match.params.id}/>
    </div>
  );
}

export default ProjectPage; 