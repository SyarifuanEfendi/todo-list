import React from "react";

const TasksLayout = (props: any) => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default TasksLayout;
