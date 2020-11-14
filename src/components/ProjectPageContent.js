import React from 'react';
import './css/ProjectPageContent.scss';
const api = require('../js/dbConnection.js')

function Title(props) {
	return(
		<div className="ProjectPageContent-Title">
			{props.title}
		</div>
	)
}

function Section(props) {
	let pics=[]
	let picture_paths=[]
	if (props.pictures) {
		if (props.pictures !== "") {
			picture_paths=JSON.parse(props.pictures)
		}
	}
	for (let i = 0; i < picture_paths.length; i++) {
		pics.push(
			<img 
				className="ProjectPageContent-Section-picturelist-picture"
				src={"." + picture_paths[i]}
				alt={props.name}
				key={i}
			/>
		)
	}
	return(
		<div className={"ProjectPageContent-Section " + props.name}>
			<div className="ProjectPageContent-Section-title">
				{props.name}
			</div>
			<div className="ProjectPageContent-Section-paragraph">
				{props.text}
			</div>
			<div className="ProjectPageContent-Section-picturelist">
				{pics}
			</div>
		</div>
	)
}

class ProjectPageContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project:[{}],
		}
		this.getProject()
	}

	async getProject() {
		const project = await api.makeApiGetCall('project/'+this.props.id);
		this.setState({
			project: project,
		})	
		
	}

	render() {
		return (
			<div className="ProjectPageContent">
				<Title title={this.state.project[0].name}/>
				<Section name="Prototype" text={this.state.project[0].purpose} pictures={this.state.project[0].picture_paths_prototype} />
				<Section name="Results" text={this.state.project[0].results} pictures={this.state.project[0].picture_paths_results} />
			</div>
		);
	}
}

export default ProjectPageContent