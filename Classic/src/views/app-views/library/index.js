import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import LibraryList from './list'
import AddPost from './add'
import EditPost from './edit'

const LibraryRoute = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddPost} />
			<Route path={`${match.url}/edit/:id/`} component={EditPost} />
			<Route path={`${match.url}/list/:tab?`} component={LibraryList}  />
		</Switch>
	)
}

export default LibraryRoute

