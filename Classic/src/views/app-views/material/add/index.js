import React from "react";
import PostForm from "../Form";

const AddPost = (props) => {
  return <PostForm mode="ADD" param={props.match.params} />;
};

export default AddPost;
