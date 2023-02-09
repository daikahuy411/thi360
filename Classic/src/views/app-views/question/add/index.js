import React from "react";
import QuestionForm from "../QuestionForm";

const AddQuestion = (props) => {
  return <QuestionForm mode="ADD" param={props.match.params} />;
};

export default AddQuestion;
