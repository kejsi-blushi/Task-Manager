// TaskListPage.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";

const TaskListPage = () => {
  const { currentUser } = useAuth();
  const { tasks } = useTaskContext();

  return (
    <div className="task-list-page">
      <h1>Task List</h1>
      <div className="task-list">
        <TaskList tasks={tasks} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default TaskListPage;
