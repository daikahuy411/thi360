import React from 'react'
import DocumentManageForm from '../form';

const EditForm = props => {
	return (
		<DocumentManageForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditForm
