import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import { useTaskContext } from "../context/TaskContext";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { tasks } = useTaskContext();

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === id);
    setTask(selectedTask);
  }, [id, tasks]);

  return (
    <>
      <TaskDetails task={task} />
    </>
  );
};

export default TaskDetailsPage;
