import React from 'react';
import './css/AdminTechSection.scss';
import Plus from'./assets/Plus.svg' 
import Exit from './assets/X.svg'

/****************************************************/

function TextBox(props) {
	return (
		<textarea 
		className={"AdminTechSection-TextBox "+props.className}
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

	handleClick() {
		this.setState(
			{
				buttonPressed:false
			}
		)
		this.props.controller.deleteTechPicture(this.props.index, this.props.label, 0)
	}

	render() {
		return(
			<div className="AdminTechSection-TechPicture">
				<img 
					alt="Tech" 
					src={this.props.src}
					className="AdminTechSection-TechPicture-pic"
				/>
				<img 
					className={
						"AdminTechSection-TechPicture-delete"+
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
		if (this.props.newTech === true) {
			this.props.controller.addTechToDB(this.props.index)
			this.props.toggleNewTech()
		}
		else {
			this.props.controller.updateTech(this.props.index)
		}
	}

	render() {
		let value = (this.props.newTech)?"Add":"Update";
		return(
			<input 
				type="button" 
				className={
					"AdminTechSection-update" + 
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

class AdminTechSection extends React.Component {
	constructor(props) {
		super(props)
		let newTech=false;
		if (this.props.tech.newTech) {
			newTech=true;
		}
		this.state = {
			newTech: newTech,
			buttonPressed: false,
		}
	}

	handleClick() {
		this.setState(
			{
				buttonPressed:false
			}
		)
		this.props.controller.deleteTech(this.props.index)
	}

	toggleNewTech() {
		this.setState(
			{
				newTech: false
			}
		)
	}

	render() {
		let firstElement
		if (this.props.tech.picture_path === "") {
			firstElement=(<label>
					<img 
						src={Plus}
						alt="Add"
						title="Add Picture"
						className={
							"AdminTechSection-picture-addButton" +
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
				<input className="AdminTechSection-picture-addFile"  
				onChange={
					(e) => {
						this.props.controller.handleNewPicture(e, this.props.index, "picture_path")
					}
				}
				type="file"
				/>
				</label>)
		}
		else {
			firstElement=(
				<TechPicture 
					src={this.props.tech.picture_path}
					index={this.props.index}
					label="picture_path"
					controller={this.props.controller}
				/>
			)
		}
		return (
			<div className="AdminTechSection">
				<div className="AdminTechSection-row">
					{firstElement}
					<TextBox 
						className="AdminTechSection-name"
						value={this.props.tech.name} 
						controller={this.props.controller} 
						index={this.props.index} label="name"
					/>
				</div>
				<Update 
					newTech={this.state.newTech}
					controller={this.props.controller}
					index={this.props.index}
					toggleNewTech={()=>this.toggleNewTech()}
				/>
				<img 
					className={"AdminTechSection-delete"+
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

export default AdminTechSection