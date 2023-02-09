import React from 'react'
import ProjectForm from "../form";

const ProjectAddForm = props => {
	return (
		<ProjectForm mode="EDIT" param={props.match.params}/>
	)
}

export default ProjectAddForm
