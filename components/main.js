import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './app';
import Login from './login';
import UserInfo from './userinfo';
import Registration from './registration';
import CourseSearch from './coursesearch';
import CourseInfo from './courseinfo';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={UserInfo} />
			<Route path="login" component={Login} />
			<Route path="registration" component={Registration}>
				<IndexRoute component={CourseSearch} />
				<Route path="*" component={CourseInfo} />
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));
