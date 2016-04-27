import React from 'react';
import style from './style.css';

export default class View extends React.Component{
	state = {
		username: '',
	}

	render(){
		return (
			<div class="login">
				<form>
					<label>
						Username
						<input type="text"
							onChange={(e) => {this.setState({username: e.target.value});}}
							value={this.state.username} />
					</label>
					<label>
						Password
						<input type="password" />
						<span class="help-block">For the purpose of demonstration, use any password</span>
					</label>
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}
