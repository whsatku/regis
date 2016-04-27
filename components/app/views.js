import React from 'react';
import Header from '../header';
import Login from '../login';

export default class View extends React.Component{
	state = {
		user: null,
	};

	render(){
		return (
			<div>
				<Header />
				{this.getBody()}
			</div>
		);
	}

	getBody(){
		if(!this.state.user){
			return <Login />;
		}
	}
}
