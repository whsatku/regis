import React from 'react';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	state = {
		username: '',
	};

	render(){
		return (
			<div className="container">
				<div className="col-sm-6 col-sm-offset-3">
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="form-group">
							<label>Username</label>
							<input type="text" className="form-control"
								onChange={(e) => {this.setState({username: e.target.value});}}
								value={this.state.username} autoFocus={true} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" />
							<span className="help-block">For the purpose of demonstration, use any password</span>
						</div>
						<input type="submit" value="Login" className="btn btn-primary" />
					</form>
				</div>
			</div>
		);
	}

	onSubmit(e){
		e.preventDefault();

		state.user = this.state.username;
		this.context.router.replace({
			pathname: '/',
		});
	}
}
