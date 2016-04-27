import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './app';
import Login from './login';
import UserInfo from './userinfo';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={UserInfo} />
			<Route path="login" component={Login} />
		</Route>
	</Router>
), document.getElementById('app'));
