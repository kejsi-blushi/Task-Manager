import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm";
import { useAuth } from "../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TaskDetails = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const handleBack = () => {
    setEditMode(false);
    navigate("/dashboard");
  };

  const handleEdit = () => {
    setEditMode(true);
    navigate(`edit`, { state: { task } });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      console.log("Delete task:", task.id);
      navigate("/dashboard");
    }
  };

  return (
    <div className="task-container">
      {editMode ? (
        <>
          <TaskForm task={task} setEditMode={setEditMode} />
        </>
      ) : (
        <div className="task-detail">
          {task ? (
            <>
              <div className="task-field">
                <strong>Title: </strong> <>&nbsp;</><div className="task-value">
                {task.title || "N/A"}</div>
              </div>
              <div className="task-field">
                <strong>Description:</strong>
                <>&nbsp;</><div className="task-value">
                {task.description || "N/A"}
              </div></div>
              <div className="task-field">
                <strong>Assignee: </strong>
                <>&nbsp;</><div className="task-value">{task.assignee || "N/A"}</div>
              </div>
              <div className="task-field">
                <strong>Status:</strong>
                <>&nbsp;</>
                <div className="task-value"> {task.status || "N/A"}</div>
              </div>
              <div className="task-field">
                <strong>Created at: </strong>
                <>&nbsp;</>
                <div className="task-value">{task.creationDate || "N/A"}</div>
              </div>
              <div className="button-container">
                {currentUser.role === "manager" && (
                  <Button
                    variant="outlined"
                    style={{ color: "#d11b06", borderColor: "#d11b06" }}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    sx={{ marginRight: 13, mb: 3, mt: 2, color: "#d11b06" }}
                  >
                    Delete
                  </Button>
                )}
                {/* <Button
                  style={{ color: "#0057b3e1", borderColor: "#0057b3e1" }}
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ marginRight: 35, mb: 3, mt: 2 }}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button> */}
                <Button
                  style={{ backgroundColor: " #0057b3e1", color: "#ffff" }}
                  variant="contained"
                  onClick={handleEdit}
                  startIcon={<EditIcon />}
                  sx={{ mb: 3, mt: 2 }}
                >
                  Edit
                </Button>
              </div>
            </>
          ) : (
            <p>No task details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
