import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import EditForm from './edit'

const List = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/dashboard`} />
			<Route path={`${match.url}/dashboard`} component={Dashboard} />
			<Route path={`${match.url}/edit/:id/:tab?`} component={EditForm} />
		</Switch>
	)
}

export default List
