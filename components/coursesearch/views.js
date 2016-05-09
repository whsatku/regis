import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Spinner from 'react-spinkit';
import fuzzy from 'fuzzy';

import state from '../state';

import style from './style.css'; // eslint-disable-line no-unused-vars

// don't hmr this!
let courseList = null;

if(!window.fetch){
	alert('Browser is not supported!');
}

export default class View extends React.Component{
	state = {
		ready: false,
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
				value={this.props.location.query.search || ''}
				placeholder="Search by course ID or name"
				onChange={(e) => this.context.router.replace({
					pathname: this.props.location.pathname,
					query: {search: e.target.value},
				})} autoFocus={true} />
		);

		if(!this.state.ready){
			search = <Spinner spinnerName="pulse" />;
		}

		return (
			<div>
				<h3>Enroll</h3>
				<div>{search}</div>
				{this.renderCourses()}
			</div>
		);
	}

	renderCourses(){
		if(!courseList){
			return;
		}

		if(!this.props.location.query.search){
			return (
				<p className="text-center noresult">Enter search query</p>
			);
		}

		let limit = 10;

		let filtered = this.getFilteredCourse();
		let courses = filtered.slice(0, limit).map((item) => {
			return (
				<tr key={item.id} className={classNames(
					'pointer',
					{
						'success': state.enrolledInSubject(item.id),
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
		let hasMore = <p className="text-center noresult">Refine your query for additional results</p>;

		if(courses.length < limit){
			hasMore = null;
		}

		if(courses.length === 0){
			return (
				<p className="text-center noresult">No results</p>
			);
		}

		return (
			<div>
				<table className="table table-striped table-hover coursetable">
					<tbody>
						{courses}
					</tbody>
				</table>
				{hasMore}
			</div>
		);
	}

	getFilteredCourse(){
		let query = this.props.location.query.search;

		let scores = courseList.map((item, id) => {
			let score = 0;

			if(item.id.includes(query)){
				score += 30;
			}
			if(item.id.startsWith(query)){
				score += 25;
			}
			if(item.id.substring(5).startsWith(query)){
				score += 20;
			}

			let enMatch = fuzzy.match(query, item.name.en);
			if(enMatch){
				console.log(enMatch.score, item.name.en);
				score += enMatch.score;
			}
			let thMatch = fuzzy.match(query, item.name.th);
			if(thMatch){
				score += thMatch.score;
			}

			return {
				id: id,
				score: score,
			};
		}).filter(item => item.score > 0);

		scores.sort((a, b) => b.score - a.score);

		return scores.map((item) => {
			return courseList[item.id];
		});
	}

}
