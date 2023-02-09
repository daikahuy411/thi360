import React from 'react'
import ExamForm from '../Form';

const EditExam = props => {
	return (
		<ExamForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditExam
