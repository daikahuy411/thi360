import React from "react";
import ClassForm from "../Form";

const AddForm = (props) => {
  return <ClassForm mode="ADD" param={props.match.params}  />;
};

export default AddForm;
