import React from 'react';

import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	state = {
		active: 0,
		help: null,
	}

	render(){
		let moreCreditInfo = [];
		if(this.props.credit.lecture !== undefined){
			moreCreditInfo = [
				'(',
				<abbr key="lecture" onMouseEnter={() => this.setState({help: 'Lecture credit'})} onMouseLeave={() => this.setState({help: null})}>
					{this.props.credit.lecture}
				</abbr>,
				' - ',
				<abbr key="lab" onMouseEnter={() => this.setState({help: 'Lab credit'})} onMouseLeave={() => this.setState({help: null})}>
					{this.props.credit.lab}
				</abbr>,
				' - ',
				<abbr key="self" onMouseEnter={() => this.setState({help: 'Self study credit'})} onMouseLeave={() => this.setState({help: null})}>
					{this.props.credit.self}
				</abbr>,
				')',
			];
		}

		return (
			<div className="credit">
				<abbr onMouseEnter={() => this.setState({help: 'Total credit'})} onMouseLeave={() => this.setState({help: null})}>
					{this.props.credit.total}
				</abbr> {moreCreditInfo}
				<div className="creditinfo">{this.state.help}&nbsp;</div>
			</div>
		);
	}
}
