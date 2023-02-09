import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import QuestionList from "./list";
import AddQuestion from "./add";
import EditQuestion from "./edit";

const QuestionRoute = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list/:catalogId/questions`} />
      <Route
        path={`${match.url}/add/:typeCode/:catalogId/:parentId?`}
        component={AddQuestion}
      />
      <Route
        path={`${match.url}/edit/:id/:catalogId`}
        component={EditQuestion}
      />
      <Route
        path={`${match.url}/list/:catalogId/:tab?`}
        component={QuestionList}
      />
    </Switch>
  );
};

export default QuestionRoute;
