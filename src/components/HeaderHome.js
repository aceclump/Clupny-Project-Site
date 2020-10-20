import React from 'react';
import gmailLogo from './assets/logos/gmail.png'


function HeaderHomeLink(props) {
    return(
        <div class="header-home-link">
            <a href={props.link}>
                <img class="header-home-link-logo" src={props.logo} title={props.logoTitle} />
                <div class="header-home-link-text">{props.text}</div>
            </a>
        </div>
    );
}

function HeaderHome(props) {
    return(
        <div class="header-home-link-area">
            <HeaderHomeLink link="mailto:clupnyluke@gmail.com" logo={gmailLogo} logoTitle="GMail" text="clupnyluke@gmail.com"/>
            <HeaderHomeLink link="https://" />
        </div>
    );
}


export default HeaderHome;