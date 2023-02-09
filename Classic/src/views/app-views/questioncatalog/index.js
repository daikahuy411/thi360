import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import QuestionCatalogList from "./list";

const QuestionCatalogRoute = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/edit/:id/:tab?`}
        component={QuestionCatalogList}
      />
      <Route path={`${match.url}/list`} component={QuestionCatalogList} />
      <Route
        path={`${match.url}/questions`}
        component={lazy(() => import(`../question`))}
      />
    </Switch>
  );
};

export default QuestionCatalogRoute;
