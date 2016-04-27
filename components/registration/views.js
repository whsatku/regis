import React from 'react';
import DocumentTitle from 'react-document-title';

export default class View extends React.Component{
	render(){
		return (
			<DocumentTitle title="Registration">
				<div className="container">
					<div className="col-md-8">{this.props.children}</div>
					<div className="col-md-4">
						<h4>Enrolled</h4>
						<p><strong>Semester:</strong> 2015 Second</p>
						<table className="table table-striped table-hover table-condensed">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Section</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>01913111</td>
									<td>Object Oriented Programming I</td>
									<td>450</td>
									<td>
										&times;
									</td>
								</tr>
								<tr>
									<td>01913111</td>
									<td>Object Oriented Programming I</td>
									<td>450</td>
									<td>
										&times;
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}
