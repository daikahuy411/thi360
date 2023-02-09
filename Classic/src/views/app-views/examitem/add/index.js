import React from "react";
import ExamItemForm from "../Form";

const AddQuestion = (props) => {
  return <ExamItemForm mode="ADD" param={props.match.params} />;
};

export default AddQuestion;
