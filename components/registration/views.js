import React from 'react';
import DocumentTitle from 'react-document-title';
import {Modal} from 'react-overlays';
import Spinner from 'react-spinkit';

import state from '../state';

const STATE_CONFIRM = 0;
const STATE_LOADING = 1;
const STATE_DONE = 2;

export default class View extends React.Component{
	state = {
		dropSec: null,
		dropState: STATE_CONFIRM,
	};

	componentDidMount(){
		state.on('enrolled', this.onUpdate);
	}

	componentWillUnmount(){
		state.removeListener('enrolled', this.onUpdate);
	}

	onUpdate = () => {
		this.forceUpdate();
	};

	render(){
		let confirm = null;

		if(this.state.dropSec){
			let content;

			switch(this.state.dropState){
				case STATE_CONFIRM:
					content = (
						<div>
							<div className="modal-body">
								<p className="text-center lead">Drop from this section?</p>
								<dl className="dl-horizontal">
									<dt>Code</dt>
									<dd>{this.state.dropSec.id}</dd>
									<dt>Name</dt>
									<dd>{this.state.dropSec.name}</dd>
									<dt>Type</dt>
									<dd>{this.state.dropSec.sectionType}</dd>
									<dt>Section</dt>
									<dd>{this.state.dropSec.section}</dd>
									<dt>Credit / Audit</dt>
									<dd>{this.state.dropSec.enrollType}</dd>
								</dl>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger"
									onClick={() => this.drop()}>
									Drop
								</button>
								<button type="button" className="btn btn-default"
									onClick={() => this.setState({dropSec: false})}>
									Cancel
								</button>
							</div>
						</div>
					);
					break;
				case STATE_LOADING:
					content = (
						<div className="modal-body text-center loadingdialog lead">
							Dropping...
							<Spinner spinnerName="pulse" noFadeIn />
						</div>
					);
					break;
				case STATE_DONE:
					content = (
						<div>
							<div className="modal-body">
								<p className="text-center lead">You're now dropped from this section</p>
								<dl className="dl-horizontal">
									<dt>Code</dt>
									<dd>{this.state.dropSec.id}</dd>
									<dt>Name</dt>
									<dd>{this.state.dropSec.name}</dd>
									<dt>Type</dt>
									<dd>{this.state.dropSec.sectionType}</dd>
									<dt>Section</dt>
									<dd>{this.state.dropSec.section}</dd>
									<dt>Credit / Audit</dt>
									<dd>{this.state.dropSec.enrollType}</dd>
								</dl>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default"
									onClick={() => this.setState({dropSec: null, dropState: STATE_CONFIRM})}>
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
			<DocumentTitle title="Registration">
				<div className="container">
					<div className="col-md-8">{this.props.children}</div>
					<div className="col-md-4">
						<h4>Enrolled</h4>
						<div>
							<div><strong>Semester:</strong> 2015 Second</div>
							<div><strong>Credit:</strong> {this.totalCredit()}/23</div>
						</div>
						<table className="table table-striped table-hover table-condensed">
							<thead>
								<tr>
									<th>ID</th>
									<th>Section</th>
									<th>Type</th>
									<th>Credit</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.renderEnroll()}
							</tbody>
						</table>
					</div>
					<Modal show={!!this.state.dropSec} backdropClassName="modal-backdrop in">
						<div className="modal" style={{display: 'block'}}>{confirm}</div>
					</Modal>
				</div>
			</DocumentTitle>
		);
	}

	renderEnroll(){
		let explaination = {
			'C': 'Credit',
			'A': 'Audit',
		};

		return state.enrolled.map((item) => {
			return (
				<tr key={`${item.id} ${item.section} ${item.sectionType}`}>
					<td>
						{item.id}
						<div><small>{item.name}</small></div>
					</td>
					<td>{item.section} <small>({item.sectionType})</small></td>
					<td><abbr title={explaination[item.enrollType]}>{item.enrollType}</abbr></td>
					<td>{item.credit}</td>
					<td><button className="btn btn-sm btn-danger" onClick={() => this.setState({dropState: STATE_CONFIRM, dropSec: item})}>Drop</button></td>
				</tr>
			);
		});
	}

	totalCredit(){
		let credit = 0;

		for(let item of state.enrolled){
			credit += item.credit;
		}

		return credit;
	}

	drop(){
		this.setState({
			dropState: STATE_LOADING,
		});

		state.enrolled = state.enrolled.filter((item) => {
			if(item === this.state.dropSec){
				return false;
			}

			return true;
		});

		setTimeout(() => {
			this.setState({
				dropState: STATE_DONE,
			});
		}, 500);
	}
}
