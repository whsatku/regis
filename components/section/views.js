import React from 'react';
import Spinner from 'react-spinkit';
import {Modal} from 'react-overlays';

import style from './style.css'; // eslint-disable-line no-unused-vars

const STATE_CONFIRM = 0;
const STATE_LOADING = 1;
const STATE_DONE = 2;

export default class View extends React.Component{
	state = {
		enroll: null,
		enrollState: STATE_CONFIRM,
	};

	render(){
		if(this.props.section === null){
			return <Spinner spinnerName="pulse" />;
		}else if(this.props.section.length === 0){
			return <div>Course is not offered in this semester.</div>;
		}else{
			let sections = this.props.section.map((section) => {
				let enrollBtn = <button type="button" className="btn btn-sm btn-primary" onClick={() => this.setState({enroll: section})}>Enroll</button>;
				return (
					<tr key={`${section.id} ${section.type}`}>
						<td>
							{enrollBtn}
						</td>
						<td>{section.id}</td>
						<td>{section.type}</td>
						<td>{section.date}</td>
						<td>{section.location}</td>
						<td>{section.instructors.join(', ')}</td>
						<td><strong>{section.enrolled}</strong>/{section.accept}</td>
					</tr>
				);
			});

			let confirm = null;

			if(this.state.enroll){
				let content;

				switch(this.state.enrollState){
					case STATE_CONFIRM:
						content = (
							<div>
								<div className="modal-body">
									<p className="text-center lead">Enroll in this section?</p>
									<dl className="dl-horizontal">
										<dt>Code</dt>
										<dd>{this.props.course.id}</dd>
										<dt>Name</dt>
										<dd>{this.props.course.name.en}</dd>
										<dt>Type</dt>
										<dd>{this.state.enroll.type}</dd>
										<dt>Section</dt>
										<dd>{this.state.enroll.id}</dd>
									</dl>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-primary"
										onClick={() => this.enroll()}>
										Enroll
									</button>
									<button type="button" className="btn btn-default"
										onClick={() => this.setState({enroll: false})}>
										Cancel
									</button>
								</div>
							</div>
						);
						break;
					case STATE_LOADING:
						content = (
							<div className="modal-body text-center loadingdialog lead">
								Enrolling...
								<Spinner spinnerName="pulse" noFadeIn />
							</div>
						);
						break;
					case STATE_DONE:
						content = (
							<div>
								<div className="modal-body">
									<p className="text-center lead">You're now enrolled to this section</p>
									<dl className="dl-horizontal">
										<dt>Code</dt>
										<dd>{this.props.course.id}</dd>
										<dt>Name</dt>
										<dd>{this.props.course.name.en}</dd>
										<dt>Type</dt>
										<dd>{this.state.enroll.type}</dd>
										<dt>Section</dt>
										<dd>{this.state.enroll.id}</dd>
									</dl>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default"
										onClick={() => this.setState({enroll: false, enrollState: STATE_CONFIRM})}>
										Close
									</button>
								</div>
							</div>
						);
						break;
				}

				confirm = (
					<div className="modal-dialog">
						<div className="modal-content">
							{content}
						</div>
					</div>
				);
			}

			return (
				<div>
					<div className="table-responsive">
						<table className="table table-striped table-hover coursetable">
							<thead>
								<tr>
									<th></th>
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
					</div>
					<Modal show={!!this.state.enroll} backdropClassName="modal-backdrop in">
						<div className="modal" style={{display: 'block'}}>{confirm}</div>
					</Modal>
				</div>
			);
		}
	}

	enroll(){
		this.setState({
			enrollState: STATE_LOADING,
		});
		setTimeout(() => {
			this.setState({
				enrollState: STATE_DONE,
			});
		}, 500);
	}
}
