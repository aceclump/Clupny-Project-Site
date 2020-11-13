import React from 'react';
import HeaderHome from '../components/HeaderHome.js'
import Sidebar from '../components/Sidebar.js'
import ContentBackground from '../components/ContentBackground.js'
import "./css/Home.scss"

function Home() {
  return (
    <div className="Home">
      <HeaderHome />
      <Sidebar />
      <ContentBackground />
      <div className="HomeContent"> 
        My Name is Lucas Clupny, as you can probably tell. I first became interested in programming in highschool
        working on my school's web team. It was an official class that was in charge of keeping the school's website updated.
        As a Senior, I was in charge of migrating the current site to a new wordpress site as well as a complete visual remake.
        Then, I went to Wichita State University for computer science and did very well. I got hired as a warehouse worker at Next Led and was
        moved after a few months to the main office from the warehouse to work on scripts and a website project. I created 
        a website for them that would render video content for customers based on a ui template. After that I fell into
        a deep depression and would spend the next 2 years in and out of work depending on the severity of my disease. 
        This year, I finally changed to a medication that worked and was able to return to a stable productive state. 
        Now, I am working fervently on learning as much as I can about programming and looking for a company to start a
        career with.
      </div>
    </div>
    
  );
}

export default Home;