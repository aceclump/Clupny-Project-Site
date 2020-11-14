import React from 'react';
import './css/ProjectListContent.scss';
const api=require('../js/dbConnection.js');

function ProjectListSection(props) {
	let projectPic = "";
	if (props.project.picture_paths_results !== "") {
		projectPic=JSON.parse(props.project.picture_paths_results)[0]
	}
	else if (props.project.picture_paths_prototype !== "") {
		projectPic=JSON.parse(props.project.picture_paths_prototype)[0]
	}
	if (projectPic !== "") {
		projectPic = (
			<img 
				className="ProjectListSection-projectPic" 
				src={projectPic} 
				alt="Project"
			/>
		)
	}

	let tech_ids=[]
	if (props.project.tech_ids !== "") {
		tech_ids=JSON.parse(props.project.tech_ids)
	}
	let techs = []
	let tech;
	for (let i = 0; i < tech_ids.length; i++) {
		tech=props.getTech(tech_ids[i])
		if (tech) {
			techs.push(
				<img className="ProjectListSection-techPic" src={tech.picture_path} alt={tech.name} title={tech.name} key={i}/>
			)
		}
	}
	
	return (
		<div className="ProjectListSection">
			<a className="ProjectListSection-link" href={"/projectpage/"+props.project.id}>
				<div className="ProjectListSection-row first">
					 {projectPic}
					<div className="ProjectListSection-name">
						{props.project.name}
					</div>
					<div className="ProjectListSection-techs">
						{techs}
					</div>
				</div>
				<div className="ProjectListSection-row second">
					<li>{props.project.description}</li>
				</div>
			</a>
		</div>
	)
}

class ProjectListContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			projects: [],
			techs: [],
        }
		this.getProjectList();
		this.getTechList();
	}

	async getProjectList() {
        let out = [];
        const projects = await api.makeApiGetCall('projects/');
        this.setState({
            projects: projects,
        })
        return out;
	}
	
	async getTechList() {
        let out = [];
        const techs = await api.makeApiGetCall('techs/');
        this.setState({
            techs: techs,
        })
        return out;
	}

	getTech(id) {
		for (let i = 0; i < this.state.techs.length; i++) {
			if (this.state.techs[i].id === id) {
				
				return this.state.techs[i]
			}
		}
	}

	render() {
		let content=[];
		for (let i = 0; i < this.state.projects.length; i++) {
			content.push(
				<ProjectListSection project={this.state.projects[i]} getTech={(id)=>this.getTech(id)} key={i}/>
			)
		}
		return (
			<div className="ProjectListContent">
				<div className="ProjectListContent-title">
					Projects
				</div>
				{content}
			</div>
		);
	}
}

export default ProjectListContent