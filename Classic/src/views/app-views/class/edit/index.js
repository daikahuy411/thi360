import React from 'react'
import ClassForm from '../Form';

const EditForm = props => {
	return (
		<ClassForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditForm
