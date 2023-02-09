import React from 'react'
import ExamItemForm from '../Form';

const EditQuestion = props => {
	return (
		<ExamItemForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditQuestion
