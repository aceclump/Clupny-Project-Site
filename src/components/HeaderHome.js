import React from 'react';
import gmailLogo from './assets/logos/gmail.png';
import githubLogo from './assets/logos/GitHub-Mark-64px.png';
import resumeLogo from './assets/logos/Very-Basic-Document-Filled-icon.png';
import profilePic from './assets/ProfilePic.png';
import './css/HeaderHome.scss';

function HeaderHomeLink(props) {
    return(
        <div className="HeaderHome-linkArea-link">
            <a href={props.link} download={props.download}>
                <div className="HeaderHome-linkArea-link-logo" >
                    <img src={props.logo} title={props.logoTitle} alt={props.logoTitle} />
                </div>
                <div className="HeaderHome-linkArea-link-text">{props.text}</div>
            </a>
        </div>
    );
}

function HeaderHome(props) {
    return(
        <div className="HeaderHome">
            <img className="HeaderHome-profilePic" src={profilePic} alt="Me" title="Profile picture of me" />
            <div className="HeaderHome-introduction">
                <div className="HeaderHome-introduction-name">
                    Lucas L. Clupny
                </div>
                <div className="HeaderHome-introduction-hr"></div>
                <div className="HeaderHome-introduction-title">
                    Junior Fullstack Developer
                </div>
            </div>
            <div className="HeaderHome-linkArea">
                <HeaderHomeLink link="mailto:clupnyluke@gmail.com" logo={gmailLogo} logoTitle="GMail" text="clupnyluke@gmail.com"/>
                <HeaderHomeLink link="https://github.com/aceclump" logo={githubLogo} logoTitle="GitHub" text="https://github.com/aceclump"/>
                <HeaderHomeLink link="/downloads/resume.docx" logo={resumeLogo} logoTitle="Resume" text="My Resume" download="download"/>
            </div>
        </div>
    );
}

export default HeaderHome;