import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';

import state from '../state';
import style from './style.css'; // eslint-disable-line no-unused-vars

export default class View extends React.Component{
	state = {
		payment: 0,
	};

	render(){
		return (
			<div className="container">
				<section className="notheme">
					<h3>John Doe</h3>
					<h4>{state.user}</h4>
				</section>

				<section className="theme1">
					<h4><Link to="/registration">Registration &raquo;</Link></h4>
					<div className="row infolets">
						<div className="infolet col-sm-3">
							<div className="title">Semester</div>
							<div className="content">2015 Second</div>
						</div>
						<div className="infolet col-sm-3 col-xs-6">
							<div className="title">Date</div>
							<div className="content">2016-01-10</div>
						</div>
						<div className="infolet col-sm-3 col-xs-6">
							<div className="title">Time</div>
							<div className="content">11:00 - 12:00</div>
						</div>
					</div>
					{this.getPaymentDemo()}
				</section>

				<section className="theme2">
					<h4>Degree</h4>
					<div className="row infolets">
						<div className="infolet col-sm-2">
							<div className="title">Degree</div>
							<div className="content">Bachelor</div>
						</div>
						<div className="infolet col-sm-6">
							<div className="title">Major</div>
							<div className="content">Software & Knowledge Engineering <small>(E17)</small></div>
						</div>
						<div className="infolet col-sm-4">
							<div className="title">Faculty</div>
							<div className="content">Engineering</div>
						</div>
						<div className="infolet col-sm-5">
							<div className="title">Program</div>
							<div className="content">International Program (Special Program)</div>
						</div>
						<div className="infolet col-sm-2">
							<div className="title">Campus</div>
							<div className="content">Bangkhen</div>
						</div>
						<div className="infolet col-sm-4">
							<div className="title">Advisor</div>
							<div className="content">Jane Doe <small>(E0000)</small></div>
						</div>
					</div>
					<h4 className="padbefore">Personal information</h4>
					<div className="row infolets">
						<div className="infolet col-sm-3">
							<div className="title">ID</div>
							<div className="content">xxxxxxxxxxxxx</div>
						</div>
						<div className="infolet col-sm-2 col-xs-3">
							<div className="title">Sex</div>
							<div className="content">Female</div>
						</div>
						<div className="infolet col-sm-7 col-xs-9">
							<div className="title">Country</div>
							<div className="content">Thailand</div>
						</div>
					</div>
				</section>
			</div>
		);
	}

	getPaymentDemo(){
		switch(this.state.payment){
			case 0:
				return (
					<div className="row infolets" onClick={this.switchPayment}>
						<div className="infolet col-sm-2">
							<div className="title">Payment</div>
							<div className="content text-success">Paid</div>
						</div>
						<div className="infolet col-sm-3 col-xs-6">
							<div className="title">Bank</div>
							<div className="content">Krung Thai Bank</div>
						</div>
						<div className="infolet col-sm-3 col-xs-6">
							<div className="title">Payment Date</div>
							<div className="content">2015-12-21</div>
						</div>
						<div className="infolet col-sm-2 col-xs-6">
							<div className="title">Amount</div>
							<div className="content">60,700 THB</div>
						</div>
					</div>
				);
			case 1:
				return (
					<div className="row infolets" onClick={this.switchPayment}>
						<div className="infolet col-sm-2">
							<div className="title">Payment</div>
							<div className="content text-danger">Unpaid</div>
						</div>
						<div className="infolet col-sm-2 col-xs-6">
							<div className="title">Pay by</div>
							<div className="content">2015-12-21</div>
						</div>
						<div className="infolet col-sm-2 col-xs-6">
							<div className="title">Amount</div>
							<div className="content">60,700 THB</div>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="row infolets" onClick={this.switchPayment}>
						<div className="infolet col-sm-2">
							<div className="title">Payment</div>
							<div className="content text-success">Exempt</div>
						</div>
						<div className="infolet col-sm-10">
							<div className="title">Exemption</div>
							<div className="content">University's fee, credit fee, faculty's fee</div>
						</div>
					</div>
				);
		}
	}

	switchPayment = () => {
		this.setState({
			payment: (this.state.payment + 1) % 3,
		});
	};
}
