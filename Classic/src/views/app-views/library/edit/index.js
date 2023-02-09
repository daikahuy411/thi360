import React from 'react'
import PostForm from '../Form';

const EditPost = props => {
	return (
		<PostForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditPost
