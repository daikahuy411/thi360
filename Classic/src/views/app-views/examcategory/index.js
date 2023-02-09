import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamCategoryEdit from "./edit";
import ExamList from './list';

const ExamCategories = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        component={ExamCategoryEdit}
      />
			<Route path={`${match.url}/list`} component={ExamList} />
    </Switch>
  );
};

export default ExamCategories;
