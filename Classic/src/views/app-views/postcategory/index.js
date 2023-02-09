import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Edit from "./edit";
import List from './list';

const ExamCategories = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/edit/:id/`}
        component={Edit}
      />
			<Route path={`${match.url}/list`} component={List} />
    </Switch>
  );
};

export default ExamCategories;
