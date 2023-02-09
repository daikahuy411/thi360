import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CategoryEdit from "./edit";
import List from './list';

const LibraryCategories = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        component={CategoryEdit}
      />
			<Route path={`${match.url}/list`} component={List} />
    </Switch>
  );
};

export default LibraryCategories;
