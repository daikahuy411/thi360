import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import Dashboard from "./dashboard";
import ProjectAddForm from "./add";

const ProjectModuleRoute = ({ match }) => {
  return (
    <Switch>
      {/* <Redirect exact from={`${match.url}`} to={`${match.url}/dashboard`} />
      <Route path={`${match.url}/dashboard`} component={Dashboard} /> */}
      <Route path={`${match.url}/add`} component={ProjectAddForm} />
    </Switch>
  );
};

export default ProjectModuleRoute;
