// TaskForm.js
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import userList from "../context/userList";

const TaskForm = ({ task, setEditMode }) => {
  const { addTask, editTask } = useTaskContext();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect called with task:", task);
    if (task && task.id) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("assignee", task.assignee);
      setValue("status", task.status);
    }
  }, [task, setValue]);
  const generateCreationDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedTime} on ${formattedDate}`;
  };

  const onSubmit = (data) => {
    const taskData = {
      title: data.title,
      description: data.description || "",
      assignee: data.assignee,
      status: data.status || "To Do",
      creationDate: generateCreationDate(),
    };

    if (task) {
      editTask(task.id, taskData);
      console.log("Task updated:", task.id);
      setMessage("Task successfully updated!");
    } else {
      const newTask = {
        id: generateTaskId(),
        ...taskData,
      };
      addTask(newTask);
      console.log("Task added:", newTask);
      setMessage("Task successfully added!");
    }

    reset();
    setTimeout(() => {
      setMessage("");
      setEditMode(false);
      navigate("/dashboard");
    }, 1000);
  };

  const generateTaskId = () => {
    return new Date().getTime().toString();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ mt: "15px" }} variant="h4">
        {task ? "Edit Issue" : "Create Issue"}
      </Typography>

      {message && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {message}.
        </Alert>
      )}

      <TextField
        label="Title*"
        {...register("title", { required: "Title is required" })}
        fullWidth
        error={!!errors.title}
        helperText={errors.title && errors.title.message}
        sx={{ mt: 2, width: "80%" }}
        size="small"
      />

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        {...register("description")}
        sx={{ mt: 2, width: "80%" }}
      />

      <FormControl fullWidth sx={{ mt: 2, width: "80%" }} size="small">
        <InputLabel htmlFor="assignee-label">Assignee*</InputLabel>
        <Select
          value={watch("assignee", task && task.assignee ? task.assignee : "")}
          labelId="assignee-label"
          label="Assignee*"
          {...register("assignee", { required: "Assignee is required" })}
          error={!!errors.assignee}
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={`${user.fname} ${user.lname}`}>
              {`${user.fname} ${user.lname}`}
            </MenuItem>
          ))}
        </Select>

        {errors.assignee && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {errors.assignee.message}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ mt: 1, width: "80%" }} size="small">
        <InputLabel htmlFor="status-label">Status</InputLabel>
        <Select
          label="Status"
          {...register("status")}
          value={watch("status", task && task.status ? task.status : "")}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>

      <div className="button-container">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setEditMode(false);
            navigate("/dashboard");
          }}
          startIcon={<ArrowBackIcon />}
          sx={{ marginRight: 38, mb: 3, mt: 2 }}
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mb: 3, mt: 2 }}
        >
          {task ? "Save Changes" : "Create Issue"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
