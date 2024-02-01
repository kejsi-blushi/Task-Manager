import React from "react";
import TaskForm from "../components/TaskForm";
import MiniDrawer from "../components/DashboardHome";

const AddTask = () => {
  const [editMode, setEditMode] = React.useState(false);

  return (
    <div className="task-edit">
      <TaskForm setEditMode={setEditMode} />
    </div>
  );
};

export default AddTask;
