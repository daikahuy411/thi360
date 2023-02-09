import React from "react";
import ExamForm from "../Form";

const AddExam = (props) => {
  return <ExamForm mode="ADD" param={props.match.params} />;
};

export default AddExam;
