import React from "react";

function Prayer(props) {
  const { name, time } = props;
  return (
    <div className="prayer">
      <div className="name">{name}</div>
      <div className="time">{time}</div>
    </div>
  );
}

export default Prayer;
