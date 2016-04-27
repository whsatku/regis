import React from 'react';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	render(){
		return (
			<div className="container">
				<h3>John Doe</h3>
				<h4>{state.user}</h4>

				<div className="status">
					<strong>Currently studying</strong> 					student in <strong>Software and Knowledge Engineering</strong> <small>(E17)</small>, Faculty of <strong>Engineering</strong>
				</div>
			</div>
		);
	}
}
