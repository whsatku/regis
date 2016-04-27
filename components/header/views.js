import React from 'react';

export default class View extends React.Component{
	render(){
		let user = null;

		if(this.props.user){
			user = <div class="user">{this.props.user}</div>;
		}

		return (
			<div>
				<div class="branding">Course Registration</div>
				{user}
			</div>
		);
	}
}
