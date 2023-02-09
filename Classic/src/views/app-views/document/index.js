import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddForm from "./add";
import EditForm from "./edit";

import Document from "./manage";

const List = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/manage`} />
      <Route path={`${match.url}/manage`} component={Document} />
      <Route path={`${match.url}/add`} component={AddForm} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        render={(props) => <EditForm {...props} />}
      />
    </Switch>
  );
};

export default List;
