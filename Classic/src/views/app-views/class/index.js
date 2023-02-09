import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ClassList from './list';
import AddForm from './add'
import EditForm from './edit'

const List = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/list`} component={ClassList} />
			<Route path={`${match.url}/add`} component={AddForm} />
			<Route path={`${match.url}/edit/:id/:tab?`} component={EditForm} />
		</Switch>
	)
}

export default List
