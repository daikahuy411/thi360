import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ExamList from './list';
import AddExam from './add'
import EditExam from './edit'

const Exam = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/list/:tab?`} component={ExamList} />
			<Route path={`${match.url}/add`} component={AddExam} />
			<Route path={`${match.url}/edit/:id/:tab?`} component={EditExam} />
		</Switch>
	)
}

export default Exam
