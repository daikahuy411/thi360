import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import List from "./list";
import Add from "./add";
import Edit from "./edit";

const CourseRoute = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list/:tab?`} component={List} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        render={(props) => <Edit {...props} />}
      />
    </Switch>
  );
};

export default CourseRoute;
