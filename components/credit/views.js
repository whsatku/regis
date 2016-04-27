import React from 'react';

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
			<div>
				<abbr onMouseEnter={() => this.setState({help: 'Total credit'})} onMouseLeave={() => this.setState({help: null})}>
					{this.props.credit.total}
				</abbr> {moreCreditInfo}
				<div style={{fontSize: '10pt'}} className="help-block">{this.state.help}&nbsp;</div>
			</div>
		);
	}
}
