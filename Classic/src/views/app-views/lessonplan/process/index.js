import React from "react";
import LessonPlanForm from "../Form";

const ProcessForm = (props) => {
  return <LessonPlanForm mode="PROCESS" param={props.match.params}  />;
};

export default ProcessForm;
