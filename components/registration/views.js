import React from 'react';
import DocumentTitle from 'react-document-title';

import state from '../state';

export default class View extends React.Component{
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
		return (
			<DocumentTitle title="Registration">
				<div className="container">
					<div className="col-md-8">{this.props.children}</div>
					<div className="col-md-4">
						<h4>Enrolled</h4>
						<p>
							<div><strong>Semester:</strong> 2015 Second</div>
							<div><strong>Credit:</strong> {this.totalCredit()}/23</div>
						</p>
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
				</div>
			</DocumentTitle>
		);
	}

	renderEnroll(){
		return state.enrolled.map((item) => {
			return (
				<tr key={`${item.id} ${item.section} ${item.sectionType}`}>
					<td>
						{item.id}
						<div><small>{item.name}</small></div>
					</td>
					<td>{item.section} <small>({item.sectionType})</small></td>
					<td>{item.enrollType}</td>
					<td>{item.credit}</td>
					<td><button className="btn btn-sm btn-danger">Drop</button></td>
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
}
