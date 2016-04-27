import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import style from './style.css'; // eslint-disable-line no-unused-vars

// don't hmr this!
let courseList = null;

if(!window.fetch){
	alert('Browser is not supported!');
}

export default class View extends React.Component{
	state = {
		ready: false,
		input: '',
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	componentWillMount(){
		if(courseList){
			this.setState({ready: true});
		}
	}

	componentDidMount(){
		if(!courseList){
			fetch('https://whsatku.github.io/skecourses/list.json')
				.then((x) => x.json())
				.then((data) => {
					courseList = data;
					this.setState({
						ready: true,
					});
				});
		}
	}

	render(){
		let search = (
			<input type="text" className="form-control"
				value={this.state.input}
				placeholder="Search by course ID"
				onChange={(e) => this.setState({input: e.target.value})} />
		);

		if(!this.state.ready){
			search = 'Loading courses';
		}

		return (
			<div>
				<h3>Enroll</h3>
				{search}
				{this.renderCourses()}
			</div>
		);
	}

	renderCourses(){
		if(!courseList){
			return;
		}

		let limit = 10;

		let courses = courseList.filter((item) => {
			return item.id.includes(this.state.input);
		}).slice(0, limit).map((item) => {
			return (
				<tr key={item.id} className={classNames(
					'pointer',
					{
						'success': item.id === '01219112',
					}
				)} onClick={() => {
					this.context.router.push(`/registration/${item.id}`);
				}}>
					<td style={{width: '100px'}}>{item.id}</td>
					<td><Link to={`/registration/${item.id}`}>
						<strong className="semibold">{item.name.en}</strong>
						<br />{item.name.th}
					</Link></td>
					<td style={{width: '100px'}}>3 (3-0-0)</td>
				</tr>
			);
		});

		return (
			<table className="table table-striped table-hover coursetable">
				<tbody>
					{courses}
				</tbody>
			</table>
		);
	}

}
