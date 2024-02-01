// Dashboard.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { tasks } = useTaskContext();

  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="dashboard-container">
      <p>Projects//Kanban Board</p>
      <h1>Welcome to the Dashboard, {currentUser.fname}!</h1>
      <div className="task-board">
        <div className="column">
          <h2 className="sticky-header">
            To Do (
            {currentUser.role === "manager"
              ? todoTasks.length
              : todoTasks.filter((task) => task.assignee === currentUser.id).length}
            )
          </h2>
            <TaskList tasks={todoTasks} currentUser={currentUser} />
        
        </div>

        <div className="column">
          <h2 className="sticky-header">
            In Progress (
            {currentUser.role === "manager"
              ? inProgressTasks.length
              : inProgressTasks.filter((task) => task.assignee === currentUser.id).length}
            )
          </h2>

            <TaskList tasks={inProgressTasks} currentUser={currentUser} />

        </div>

        <div className="column">
          <h2 className="sticky-header">
            Done (
            {currentUser.role === "manager"
              ? doneTasks.length
              : doneTasks.filter((task) => task.assignee === currentUser.id).length}
            )
          </h2>

            <TaskList tasks={doneTasks} currentUser={currentUser} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
