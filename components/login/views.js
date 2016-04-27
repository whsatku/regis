import React from 'react';
import classNames from 'classnames';
import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	state = {
		username: '',
		hasPassword: false,
		error: '',
		errorFields: [],
	};

	componentWillMount(){
		let state = Object.assign({}, state, this.props.location.state);
		this.setState(state);
	}

	render(){
		let error = null;

		if(this.state.error){
			error = (
				<div className="alert alert-danger">{this.state.error}</div>
			);
		}

		return (
			<div className="container">
				<div className="col-sm-6 col-sm-offset-3">
					<form onSubmit={this.onSubmit.bind(this)}>
						{error}
						<div className={classNames(['form-group'], {
							'has-error': this.state.errorFields.includes('username'),
						})}>
							<label className="control-label">Username</label>
							<input type="text" className="form-control"
								onChange={(e) => {this.setState({username: e.target.value});}}
								value={this.state.username} autoFocus={true}
								required={true} />
						</div>
						<div className={classNames(['form-group'], {
							'has-error': this.state.errorFields.includes('password'),
						})}>
							<label className="control-label">Password</label>
							<input type="password" className="form-control"
								onChange={(e) => {this.setState({hasPassword: e.target.value.length > 0});}} />
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

		if(!this.state.username){
			this.setState({
				error: 'Username is required',
				errorFields: ['username'],
			});
			return;
		}
		if(!this.state.hasPassword){
			this.setState({
				error: 'Password is required',
				errorFields: ['password'],
			});
			return;
		}

		state.user = this.state.username;

		let returnPath = '/';
		if(this.state.return){
			returnPath = this.state.return;
		}

		this.context.router.replace(returnPath);
	}
}
