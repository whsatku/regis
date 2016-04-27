import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-overlays';

import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	state = {
		showLogout: false,
	};

	render(){
		let user = null;

		if(state.user){
			user = (
				<div className="user">
					{state.user}
					<span className="logout">
						(<a href="#" onClick={(e) => {
							e.preventDefault();
							this.setState({showLogout: true});
						}}>Logout</a>)
					</span>
				</div>
			);
		}else{
			user = (
				<div className="user">
					Not logged in
				</div>
			);
		}

		return (
			<div className="container header">
				<div className="col-sm-9">
					<Link to="/" className="branding">Kasetsart University</Link>
				</div>
				<div className="col-sm-3 text-right">
					{user}
				</div>

				<Modal show={this.state.showLogout} backdropClassName="modal-backdrop in"
					onHide={() => this.setState({showLogout: false})}>
					<div className="modal" style={{display: 'block'}}>
						<div className="modal-dialog modal-sm">
							<div className="modal-content">
								<div className="modal-header">Logout?</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger"
										onClick={() => this.logout()}>
										Logout
									</button>
									<button type="button" className="btn btn-default"
										onClick={() => this.setState({showLogout: false})}>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}

	logout(){
		this.setState({showLogout: false});
		state.user = null;
		this.context.router.replace('/login');
	}
}
