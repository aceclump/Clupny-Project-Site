import React from 'react';
import AdminProjectSection from './AdminProjectSection'
import Plus from'./assets/Plus.svg' 
import './css/AdminProjectArea.scss';

class AdminProjectArea extends React.Component {
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
		this.props.controller.handleNewProject(this.props.controller.projects.length)
	}

	render() {
		let content = [];

		if (this.props.fake) {
			content.push(
				<div className="AdminProjectArea-warning" key="-1">
					Warning: Some functionality has been disabled because you are a guest<br/>
					-Can not add prototype, results, or tech pictures<br/>
					-Can not make permenant changes (refresh will delete all changes)
				</div>
			)
		}

		if (this.props.controller.projects) {
			for (let i = 0; i<this.props.controller.projects.length; i++) {
				content.push(
					<AdminProjectSection
						project={this.props.controller.projects[i]}
						controller={this.props.controller}
						id={this.props.controller.projects[i].id}
						key={i}
						index={i}
					/>
				)
			}
		}

		return (
			<div className="AdminProjectArea">
				{content}
				<img
					src={Plus}
					alt="Add Project"
					title="Add Project"
					className={
						"AdminProjectArea-addButton"+
						 ((this.state.buttonPressed)?" pressed":" unpressed")
					} 
					onMouseDown={
						() => {
							this.setState(
								{
									buttonPressed: true,
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
		);
	}
}

export default AdminProjectArea