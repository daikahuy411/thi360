import React from 'react'
import LessonPlanForm from '../Form';

const EditForm = props => {
	return (
		<LessonPlanForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditForm
