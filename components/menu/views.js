import React from 'react';
import {Link} from 'react-router';

import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	render(){
		return (
			<div className="container menubar">
				<ul className="list-inline">
					<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>User information</Link></li>
					<li><Link to="/registration" activeClassName="active">Registration</Link></li>
				</ul>
			</div>
		);
	}
}
