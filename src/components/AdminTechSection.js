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

class AdminTechSection extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {

		return (
			<div className="AdminTechSection">

			</div>
		);
	}
}

export default AdminTechSection