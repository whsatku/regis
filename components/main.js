import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './app';
import Login from './login';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="login" component={Login} />
		</Route>
	</Router>
), document.getElementById('app'));
