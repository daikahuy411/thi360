import React from "react";
import CourseForm from "../Form";

const Add = (props) => {
  return <CourseForm mode="ADD" param={props.match.params} />;
};

export default Add;
