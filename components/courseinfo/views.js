import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';

import Credit from '../credit';

export default class View extends React.Component{
	state = {
		info: null,
		section: null,
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	componentDidMount(){
		this.fetchDetail(this.props.params.splat);
	}

	componentWillReceiveProps(props){
		if(props.params.splat === this.props.params.splat){
			return;
		}

		this.setState({
			info: null,
			section: null,
		});
		this.fetchDetail(props.params.splat);
	}

	fetchDetail(courseId){
		fetch(`https://whsatku.github.io/skecourses/${courseId}.json`)
			.then((x) => x.json())
			.then((data) => this.setState({info: data}));

		fetch(`https://whsatku.github.io/skecourses/sections/${courseId}.json`)
			.then((x) => x.json())
			.then(
				(data) => this.setState({section: data}),
				() => this.setState({section: []})
			);
	}

	render(){
		if(!this.state.info){
			return (
				<DocumentTitle title={this.props.params.splat}>
					<div>
						Loading information for {this.props.params.splat}...
					</div>
				</DocumentTitle>
			);
		}

		return (
			<DocumentTitle title={`${this.state.info.id} ${this.state.info.name.en}`}>
				<div>
					<a href="#" onClick={(e) => {
						e.preventDefault();
						this.context.router.goBack();
					}}>&laquo; Back</a>
					<h3>{this.state.info.name.en}</h3>
					<h4>{this.state.info.name.th}</h4>

					<section className="theme1">
						<h4>Sections</h4>
						{this.renderEnroll()}
					</section>

					<section className="theme3">
						<div className="row infolets">
							<div className="infolet col-sm-2">
								<div className="title">Code</div>
								<div className="content">{this.state.info.id}</div>
							</div>
							<div className="infolet col-sm-3">
								<div className="title">Credit</div>
								<div className="content">
									<Credit credit={this.state.info.credit} />
								</div>
							</div>
							<div className="col-sm-7 infolet">
								<div className="title">Prerequisite</div>
								{this.renderPrereq()}
							</div>
						</div>
					</section>

					<section className="theme2">
						<h4>Course Description</h4>
						<p>{this.state.info.description.en}</p>
						<p>{this.state.info.description.th}</p>
					</section>
				</div>
			</DocumentTitle>
		);
	}

	renderPrereq(){
		let prereq = this.state.info.prereq.map((pre) => {
			let orSimul = null;

			if(pre.simultaneous){
				orSimul = ' (or simultaneous)';
			}

			return (
				<li key={pre.id}>
					<Link to={`/registration/${pre.id}`}>{pre.id}</Link>
					{orSimul}
				</li>
			);
		});

		if(prereq.length === 0){
			return <div className="content">None</div>;
		}

		return (
			<ul style={{paddingLeft: 18}}>
				{prereq}
			</ul>
		);
	}

	renderEnroll(){
		if(this.state.section === null){
			return 'Loading available offerings...';
		}else if(this.state.section.length === 0){
			return 'Course is not offered in this semester.';
		}else{
			let sections = this.state.section.map((section) => {
				return (
					<tr key={section.id}>
						<td>{section.id}</td>
						<td>{section.type}</td>
						<td>{section.date}</td>
						<td>{section.location}</td>
						<td>{section.instructors.join(', ')}</td>
						<td><strong>{section.enrolled}</strong>/{section.accept}</td>
					</tr>
				);
			});

			return (
				<table className="table table-striped table-hover coursetable">
					<thead>
						<tr>
							<th>ID</th>
							<th>Type</th>
							<th>Dates</th>
							<th>Location</th>
							<th>Instructors</th>
							<th>Enrolled</th>
						</tr>
					</thead>
					<tbody>
						{sections}
					</tbody>
				</table>
			);
		}
	}
}
