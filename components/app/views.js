import React from 'react';
import Header from '../header';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	render(){
		if(!state.user && !this.context.router.isActive({pathname: '/login'})){
			this.context.router.replace({
				pathname: '/login',
			});
		}

		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		);
	}
}
