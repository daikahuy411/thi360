import React from "react";
import LessonPlanForm from "../Form";

const AddForm = (props) => {
  return <LessonPlanForm mode="ADD" param={props.match.params}  />;
};

export default AddForm;
