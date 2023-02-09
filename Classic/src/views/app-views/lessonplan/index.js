import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import MyPlans from './myplans';
import AssignedPlans from './assignedplans';
import AddForm from './add'
import EditForm from './edit'
import ProcessForm from './process'

const List = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/assignedplans`} />
			<Route path={`${match.url}/myplans`} component={MyPlans} />
			<Route path={`${match.url}/assignedplans`} component={AssignedPlans} />
			<Route path={`${match.url}/add`} component={AddForm} />
			<Route path={`${match.url}/edit/:id/:tab?`} component={EditForm} />
			<Route path={`${match.url}/process/:id/:tab?`} component={ProcessForm} />
		</Switch>
	)
}

export default List
