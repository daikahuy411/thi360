import React from 'react'
import AnnouncementForm from '../Form';

const EditAnnouncement = props => {
	return (
		<AnnouncementForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditAnnouncement
