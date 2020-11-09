import React from 'react';
import AdminTechSection from './AdminTechSection'
import Plus from'./assets/Plus.svg' 
import './css/AdminTechArea.scss';

class AdminTechArea extends React.Component {
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
		this.props.controller.handleNewTech(this.props.controller.techs.length)
	}

	render() {
		let content = [];
		if (this.props.controller.techs) {
			for (let i = 0; i<this.props.controller.techs.length; i++) {
				content.push(
					<AdminTechSection
						tech={this.props.controller.techs[i]}
						controller={this.props.controller}
						id={this.props.controller.techs[i].id}
						key={i}
						index={i}
					/>
				)
			}
		}
		return (
			<div className="AdminTechArea">
				{content}
				<div className="AdminTechSection">
					<img
						src={Plus}
						alt="Add Tech"
						title="Add Tech"
						className={
							"AdminTechArea-addButton"+
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
			</div>
		);
	}
}

export default AdminTechArea