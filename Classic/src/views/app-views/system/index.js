import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Users from './users';
import Setting from './settings';
import Catalogs from './catalogs';

const SystemRoute = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/organizations/list`} />
			<Route path={`${match.url}/users`} component={Users}  />
			<Route path={`${match.url}/setting`} component={Setting}  />
			<Route path={`${match.url}/catalogs/:type?`} component={Catalogs}  />
		</Switch>
	)
}

export default SystemRoute

