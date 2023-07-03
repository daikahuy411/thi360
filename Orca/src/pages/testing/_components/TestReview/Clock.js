import React from "react";

// Renderer callback with condition
const Clock = ({ hours, minutes, seconds, completed }) => {
  return (
    <>
      {hours > 0 && <>0{hours}:</>}{minutes < 10 ? "0" : ""}{minutes}:{seconds < 10 ? "0" : ""}{seconds}
    </>
  );
};

export default Clock;
