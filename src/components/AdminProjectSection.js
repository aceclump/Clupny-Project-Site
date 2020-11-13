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

function TechListDialogOption(props) {
	let selected = "";
	if(props.selected) {
		selected = " selected";
	}
	return(
		<div className={"AdminProjectSection-TechList-TechListDialog-TechListDialogOption" + selected}>
			<label title={props.name}>
				<img 
					className="AdminProjectSection-TechList-TechListDialog-TechListDialogOption-pic"
					src={props.src} 
					alt={props.name}
				/>
				<div className="AdminProjectSection-TechList-TechListDialog-TechListDialogOption-text">
					{props.name}
				</div>
				<input 
					type="checkbox" 
					className="AdminProjectSection-TechList-TechListDialog-TechListDialogOption-input" 
					checked={props.selected}
					onChange={()=>props.toggleSelected()}
				/>
			</label>
		</div>
	)
}

class TechListDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPressed: false,
			tech_ids: this.props.tech_ids,
		}
	}

	toggleSelected(id) {
		let arr=this.state.tech_ids
		if (arr.includes(id)) {
			let i=0;
			while (arr[i] !== id) {
				i++
			}
			arr.splice(i, 1);
		}
		else {
			arr.push(id);
			arr.sort();
		}
		this.setState(
			{
				tech_ids: arr,
			}
		)
	}

	handleClick() {
		this.props.controller.handleTechIds(this.props.index, this.state.tech_ids)
		this.setState(
			{
				buttonPressed: false
			}
		)
		this.props.close()
	}

	render() {
		let content=[];
		for (let i = 0; i < this.props.techs.length; i++) {
			let selected=false;
			if (this.state.tech_ids.includes(this.props.techs[i].id)) {
				selected=true
			}
			content.push(
				<TechListDialogOption 
					src={this.props.techs[i].picture_path}
					name={this.props.techs[i].name}
					id={this.props.techs[i].id}
					selected={selected}
					toggleSelected={()=>this.toggleSelected(this.props.techs[i].id)}
					key={i}
				/>
			)
		}
		return (
			<div className="AdminProjectSection-TechList-TechListDialog">
				<div className="AdminProjectSection-TechList-TechListDialog-TechListDialogOptions">
					{content}
				</div>
				<input 
				type="button" 
				className={
					"AdminProjectSection-TechList-TechListDialog-confirm" + 
					((this.state.buttonPressed)?" pressed":" unpressed")
				}
				value="Confirm" 
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
			</div>
		)
	}
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
				<img 
					className="AdminProjectSection-TechList-TechPicture-pic"
					alt={this.props.name}
					title={this.props.name}
					src={this.props.src} 
				/>
			</div>
		)
	}
}

class TechList extends React.Component {
	constructor(props) {
		super(props);
		let tech_ids = [];
		if (this.props.tech_ids !== '') {
			tech_ids=JSON.parse(this.props.tech_ids)
		}
		this.state = {
			buttonPressed: false,
			dialog: false,
			tech_ids: tech_ids
		}
	}

	handleClick() {
		this.setState(
			{
				buttonPressed: false,
				dialog: true
			}
		)
	}

	toggleSelected(id) {
		let arr=this.state.tech_ids
		if (arr.includes(id)) {
			let i=0;
			while (arr[i] !== id) {
				i++
			}
			arr.splice(i, 1);
		}
		else {
			arr.push(id);
			arr.sort();
		}
		this.setState(
			{
				tech_ids: arr,
			}
		)
	}

	toggleDialog() {
		this.setState(
			{
				dialog: false
			}
		)
	}

	getTech(id) {
		for (let i = 0; i < this.props.techs.length; i++) {
			if (this.props.techs[i].id === id) {
				return this.props.techs[i]
			}
		}
	}

	render() {
		let content=[];
		if (this.state.dialog) {
			content=(
				<TechListDialog 
					controller={this.props.controller}
					tech_ids={this.state.tech_ids} 
					techs={this.props.techs}
					index={this.props.index}
					close={()=>this.toggleDialog()}
				/>
			)
		}
		else {
			let toDelete=[]
			for (let i = 0; i < this.state.tech_ids.length; i++) {
				if (this.getTech(this.state.tech_ids[i])) {
					content.push(
						<TechPicture 
							src={this.getTech(this.state.tech_ids[i]).picture_path}
							name={this.getTech(this.state.tech_ids[i]).name}
							key={i}
						/>
					)
				} 
				else {
					toDelete.push(this.state.tech_ids[i])
				}
			}
			for(let i = 0; i < toDelete.length; i++) {
				this.toggleSelected(toDelete[i]);
			}
		}
		return(
			<div className="AdminProjectSection-TechList">
				{content}
				<img 
					className={
						"AdminProjectSection-TechList-addButton" + 
						((this.state.buttonPressed)?" pressed":" unpressed")
					}
					src={Plus} 
					alt="Add"
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
				<img src={this.props.src} alt="Project" className="AdminProjectSection-PictureList-ProjectPicture-pic"/>
				<img 
					className={"AdminProjectSection-PictureList-ProjectPicture-delete"+
						((this.state.buttonPressed)?" pressed":" unpressed")
					} 
					src={Exit}
					alt="Delete"
					title="Delete Picture"
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
						alt="Add"
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
					<TechList 
						tech_ids={this.props.project.tech_ids} 
						techs={this.props.techs}
						index={this.props.index}
						controller={this.props.controller}
					/>
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
						pics={(this.props.project.picture_paths_prototype !== '')?JSON.parse(this.props.project.picture_paths_prototype):[]}
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
						pics={(this.props.project.picture_paths_results !== '')?JSON.parse(this.props.project.picture_paths_results):[]}
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
					alt="Delete"
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