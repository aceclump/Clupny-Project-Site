import React from 'react';
import './css/AdminProjectSection.scss';
import Plus from'./assets/Plus.svg' 
import Exit from './assets/X.svg'

/****************************************************/

function TextBox(props) {
	return (
		<textarea 
		className={"AdminProjectSection-TextBox "+props.className}
		 value={props.value}
		 title={props.label}
		  onChange={
			  (e) => {
				props.controller.handleTextChange(e, props.index, props.label)
			  }
			} 
		/>
	)
}

class TechPicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPressed: false
		}
	}
	render() {
		return(
			<div className="AdminProjectSection-TechList-TechPicture">
				<img alt="Tech Picture"/>
				<img alt="Delete Picture" src={Exit}/>
			</div>
		)
	}
}

class TechList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPressed: false
		}
	}

	handleClick() {
		this.setState(
			{
				buttonPressed:false
			}
		)
	}

	render() {
		let content=[];
		return(
			<div className="AdminProjectSection-TechList">
				{content}
				<img 
					className={
						"AdminProjectSection-TechList-addButton" + 
						((this.state.buttonPressed)?" pressed":" unpressed")
					}
					src={Plus} 
					onMouseDown={
						()=>{
							this.setState(
								{
									buttonPressed:true
								}
							)
						}
					}
					onMouseUp={
						()=>{
							this.handleClick()
						}
					}
					onMouseLeave={
						() => {
							this.setState(
								{
									buttonPressed: false
								}
							)
						}
					}
				/>
			</div>
		);
	}
}

class ProjectPicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPressed: false
		}
	}

	handleClick() {
		this.setState(
			{
				buttonPressed:false
			}
		)
		this.props.controller.deleteProjectPicture(this.props.index, this.props.label, this.props.picIndex)
	}

	render() {
		return(
			<div className="AdminProjectSection-PictureList-ProjectPicture">
				<img src={this.props.src} alt="Picture" className="AdminProjectSection-PictureList-ProjectPicture-pic"/>
				<img 
					className={"AdminProjectSection-PictureList-ProjectPicture-delete"+
						((this.state.buttonPressed)?" pressed":" unpressed")
					} 
					src={Exit}
					alt="Delete Picture"
					Title="Delete Picture"
					onMouseDown={
						()=>{
							this.setState(
								{
									buttonPressed:true
								}
							)
						}
					}
					onMouseUp={
						()=>{
							this.handleClick()
						}
					}
					onMouseLeave={
						() => {
							this.setState(
								{
									buttonPressed: false
								}
							)
						}
					}
				/>
			</div>
		)
	}
}

class PictureList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPressed: false
		}
	}

	render() {
		let content = [];
		for (let i = 0; i < this.props.pics.length; i ++) {
			content.push(
			<ProjectPicture 
			src={this.props.pics[i]}
			controller={this.props.controller}
			index={this.props.index}
			label="picture_paths_prototype"
			picIndex={i}
			key={i}
			/>
			)
		}
		return(
			<div className="AdminProjectSection-PictureList">
				{content}
				<label>
					<img 
						src={Plus}
						alt="Add Picture"
						title="Add Picture"
						className={
							"AdminProjectSection-PictureList-addButton" +
							((this.state.buttonPressed)?" pressed":" unpressed")
						}
						onMouseDown={
							()=>{
								this.setState(
									{
										buttonPressed: true
									}
								)
							}
						}
						onMouseUp={
							()=>{
								this.setState(
									{
										buttonPressed: false
									}
								)
							}
						}
						onMouseLeave={
							() => {
								this.setState(
									{
										buttonPressed: false
									}
								)
							}
						}
					/>
				<input className="AdminProjectSection-PictureList-addFile"  
				onChange={
					(e) => {
						this.props.controller.handleNewPicture(e, this.props.index, this.props.label)
					}
				}
				type="file"
				/>
				</label>
			</div>
			
		);
	}
}

class Update extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			buttonPressed: false,
		}
	} 

	handleClick() {
		this.setState(
			{
				buttonPressed: false,
			}
		)
		if (this.props.newProject === true) {
			this.props.controller.addProjectToDB(this.props.index)
			this.props.toggleNewProject()
		}
		else {
			this.props.controller.updateProject(this.props.index)
		}
	}

	render() {
		let value = (this.props.newProject)?"Add":"Update";
		return(
			<input 
				type="button" 
				className={
					"AdminProjectSection-update" + 
					((this.state.buttonPressed)?" pressed":" unpressed")
				}
				value={value} 
				onMouseDown={
					() => {
						this.setState(
							{
								buttonPressed: true
							}
						)
					}
				}
				onMouseUp={
					() => {
						this.handleClick()
					}
				}
				onMouseLeave={
					() => {
						this.setState(
							{
								buttonPressed: false
							}
						)
					}
				}
			/>
		)
	}
}

class AdminProjectSection extends React.Component {
	constructor(props) {
		super(props);
		let newProject=false;
		if (this.props.project.newProject) {
			newProject=true;
		}
		this.state = {
			newProject: newProject,
			buttonPressed: false
		}
	}
	
	handleClick() {
		this.setState(
			{
				buttonPressed:false
			}
		)
		this.props.controller.deleteProject(this.props.index)
	}

	toggleNewProject() {
		this.setState(
			{
				newProject: false
			}
		)
	}

	render() {
		return (
			<div className="AdminProjectSection">
				<div className="AdminProjectSection-row">
					<TextBox 
						className="AdminProjectSection-name"
						value={this.props.project.name} 
						controller={this.props.controller} 
						index={this.props.index} label="name"
					/>
					<TechList techs={this.props.project.tech_ids}/>
					<TextBox 
						className="AdminProjectSection-description" 
						value={this.props.project.description} 
						controller={this.props.controller} 
						index={this.props.index} label="description"
					/>
				</div>
				<div className="AdminProjectSection-row">
					<TextBox 
						className="AdminProjectSection-purpose" 
						value={this.props.project.purpose}
						controller={this.props.controller} 
						index={this.props.index} 
						label="purpose"
					/>
					<PictureList 
						pics={(this.props.project.picture_paths_prototype != '')?JSON.parse(this.props.project.picture_paths_prototype):[]}
						controller={this.props.controller}
						index={this.props.index}
						label="picture_paths_prototype"
					/>
				</div>
				<div className="AdminProjectSection-row">
					<TextBox 
						className="AdminProjectSection-results" 
						value={this.props.project.results}
						controller={this.props.controller} 
						index={this.props.index} label="results"
					/>
					<PictureList 
						pics={(this.props.project.picture_paths_results != '')?JSON.parse(this.props.project.picture_paths_results):[]}
						controller={this.props.controller}
						index={this.props.index}
						label="picture_paths_results"
					/>
				</div>
				<Update 
					newProject={this.state.newProject}
					controller={this.props.controller}
					index={this.props.index}
					toggleNewProject={()=>this.toggleNewProject()}
				/>
				<img 
					className={"AdminProjectSection-delete"+
						((this.state.buttonPressed)?" pressed":" unpressed")}
					src={Exit}
					onMouseDown={
						()=>{
							this.setState(
								{
									buttonPressed:true
								}
							)
						}
					}
					onMouseUp={
						()=>{
							this.handleClick()
						}
					}
					onMouseLeave={
						() => {
							this.setState(
								{
									buttonPressed: false
								}
							)
						}
					}
				/>
			</div>
		);
	}
	
}

export default AdminProjectSection