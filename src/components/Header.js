import React from 'react';
import profilePic from './assets/ProfilePic.png';
import './css/Header.scss';

function Header(props) {
	return (
		<div className="Header">
            <a href="./">
                <img className="Header-profilePic" src={profilePic} alt="Me" title="Profile picture of me" />
            </a>
            <div className="Header-introduction">
                <div className="Header-introduction-name">
                    Lucas L. Clupny
                </div>
                <div className="Header-introduction-title">
                    Junior Fullstack Developer
                </div>
				<div/>
            </div>
		</div>
	);
}

export default Header