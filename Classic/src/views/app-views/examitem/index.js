import React from "react";
import { Route, Switch } from "react-router-dom";
import AddExamItem from "./add";
import EditExamItem from "./edit";

const ExamItem = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.url}/add/:examId`} component={AddExamItem} />
      <Route path={`${match.url}/edit/:id/:tab?`} component={EditExamItem} />
    </Switch>
  );
};

export default ExamItem;
