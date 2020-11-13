import React from 'react';
import ContentBackground from '../components/ContentBackground.js'
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js'
import './css/NotFound.scss';

function NotFound(props) {
	return (
		<div className="NotFound">
			<Header />
			<Sidebar />
			<ContentBackground />
			<div className="NotFoundContent">
				PAGE NOT FOUND
			</div>
		</div>
	);
}

export default NotFound