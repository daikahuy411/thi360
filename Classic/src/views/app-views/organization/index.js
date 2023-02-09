import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import OrganizationEdit from "./edit";
import ExamList from './list';

const Organizations = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        component={OrganizationEdit}
      />
			<Route path={`${match.url}/list`} component={ExamList} />
    </Switch>
  );
};

export default Organizations;
