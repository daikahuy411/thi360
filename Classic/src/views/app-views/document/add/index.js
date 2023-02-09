import React from "react";
import DocumentManageForm from "../form";

const AddForm = (props) => {
  return <DocumentManageForm mode="ADD" param={props.match.params}  />;
};

export default AddForm;
