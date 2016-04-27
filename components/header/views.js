import React from 'react';
import {Link} from 'react-router';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

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
		}else{
			user = (
				<div className="user">
					Not logged in
				</div>
			);
		}

		return (
			<div className="container header">
				<div className="col-sm-9">
					<Link to="/" className="branding">Kasetsart University</Link>
				</div>
				<div className="col-sm-3 text-right">
					{user}
				</div>
			</div>
		);
	}

	logout(e){
		e.preventDefault();
		if(!confirm('Do you want to logout?')){
			return;
		}
		state.user = null;
		this.context.router.replace('/login');
	}
}
