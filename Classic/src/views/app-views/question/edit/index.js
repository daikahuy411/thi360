import React from 'react'
import QuestionForm from '../QuestionForm';

const EditQuestion = props => {
	return (
		<QuestionForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditQuestion
