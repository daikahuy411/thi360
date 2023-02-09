import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import AnnouncementList from './list'
import AddAnnouncement from './add'
import EditAnnouncement from './edit'

const AnnouncementRoute = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddAnnouncement} />
			<Route path={`${match.url}/edit/:id/`} component={EditAnnouncement} />
			<Route path={`${match.url}/list/:tab?`} component={AnnouncementList}  />
		</Switch>
	)
}

export default AnnouncementRoute

