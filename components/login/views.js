import React from 'react';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';

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
		if(state.user){
			this.return();
		}

		let error = null;

		if(this.state.error){
			error = (
				<div className="alert alert-danger">{this.state.error}</div>
			);
		}

		return (
			<DocumentTitle title="Login">
				<div className="container login">
					<div className="col-sm-4 branding text-center">
						<img src="ku.png" className="img-responsive" />
						<h3>Kasetsart University</h3>
						<h5>Course Registration</h5>
					</div>
					<div className="col-sm-8">
						<form onSubmit={this.onSubmit.bind(this)}>
							{error}
							<div className={classNames(['form-group'], {
								'has-error': this.state.errorFields.includes('username'),
							})}>
								<label className="control-label">Student ID</label>
								<input type="text" className="form-control"
									onChange={(e) => this.setState({username: e.target.value})}
									value={this.state.username} autoFocus={true}
									required={true}
									pattern="[5][0-9]{9}"
									placeholder="56xxxxxxxx" />
							</div>
							<div className={classNames(['form-group'], {
								'has-error': this.state.errorFields.includes('password'),
							})}>
								<label className="control-label">Password</label>
								<input type="password" className="form-control"
									onChange={(e) => this.setState({hasPassword: e.target.value.length > 0})}
									required={true} />
								<span className="help-block">For the purpose of demonstration, use any password</span>
							</div>
							<input type="submit" value="Login" className="btn btn-primary" />
						</form>
					</div>
				</div>
			</DocumentTitle>
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

		this.return();
	}

	return(){
		let returnPath = '/';
		if(this.state.return){
			returnPath = this.state.return;
		}

		this.context.router.replace(returnPath);
	}
}
