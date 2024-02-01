// TaskList.js
import React from "react";
import { Link } from "react-router-dom";
import userList from "../context/userList";
import "../App.css";

const TaskList = ({ tasks, currentUser }) => {
  const filterTasksByRole = (tasks, currentUser) => {
    if (currentUser.role === "manager") {
      return tasks;
    } else {
      return tasks.filter(
        (task) => task.assignee === `${currentUser.fname} ${currentUser.lname}`
      );
    }
  };

  const filteredTasks = filterTasksByRole(tasks, currentUser);

  const getAssigneeName = (assignee) => {
    return assignee ? assignee : "Unassigned";
  };

  console.log("Filtered Tasks:", filteredTasks);

  return (
    <>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-list-item">
            {task.id !== undefined ? (
              <Link to={`/dashboard/task/${task.id}`}>
                <div className="clickable-task">
                  <strong>Title:</strong> {task.title}
                  <br />
                  <strong>Assignee: </strong> {task.assignee}
                </div>
              </Link>
            ) : (
              <span>{task.title}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
