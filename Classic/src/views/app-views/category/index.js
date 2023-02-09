import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./list";

const Categories = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/categories/:type?`}
        render={(props) => <List {...props} />}
      />
    </Switch>
  );
};

export default Categories;
