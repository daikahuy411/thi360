import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./dashboard";
import ProjectAddForm from "./project/add";
import ProjectEditForm from "./project/edit";

const TaskModuleRoute = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/dashboard`} />
      <Route path={`${match.url}/dashboard`} component={Dashboard} />
      <Route
        path={`${match.url}/list`}
        component={lazy(() => import(`./list`))}
      />
      <Route
        path={`${match.url}/project`}
        component={lazy(() => import(`./project/list`))}
      />
      <Route path={`${match.url}/projects/add`} component={ProjectAddForm} />
      <Route
        path={`${match.url}/projects/edit/:id/:tab?`}
        render={(props) => <ProjectEditForm {...props} />}
      />
    </Switch>
  );
};

export default TaskModuleRoute;
