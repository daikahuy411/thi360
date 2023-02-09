import React from "react";
import CourseForm from "../Form";

const Edit = (props) => {
  return <CourseForm mode="EDIT" param={props.match.params} />;
};

export default Edit;
