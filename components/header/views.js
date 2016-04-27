import React from 'react';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	render(){
		let user = null;

		if(state.user){
			user = (
				<div className="user">
					{state.user}
					<span className="logout">
						(<a href="#" onClick={this.logout.bind(this)}>Logout</a>)
					</span>
				</div>
			);
		}

		return (
			<div className="container header">
				<div className="col-sm-9">
					<div className="branding">Course Registration</div>
				</div>
				<div className="col-sm-3 text-right">
					{user}
				</div>
			</div>
		);
	}

	logout(){
		if(!confirm('Do you want to logout?')){
			return;
		}
		state.user = null;
	}
}
