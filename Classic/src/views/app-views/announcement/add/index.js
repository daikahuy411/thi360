import React from "react";
import AnnouncementForm from "../Form";

const AddAnnouncement = (props) => {
  return <AnnouncementForm mode="ADD" param={props.match.params} />;
};

export default AddAnnouncement;
