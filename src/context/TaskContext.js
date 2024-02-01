// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useAuth } from "./AuthContext";

// const TaskContext = createContext();

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error("useTaskContext must be used within a TaskProvider");
//   }
//   return context;
// };

// export const TaskProvider = ({ children }) => {
//   const { currentUser } = useAuth();
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     setTasks(storedTasks);
//   }, []);

//   const addTask = (task) => {
//     const newTask = { ...task, assignee: task.assignee };

//     const newTasks = [...tasks, newTask];
//     setTasks(newTasks);
//     localStorage.setItem("tasks", JSON.stringify(newTasks));
//   };

//   const editTask = (taskId, updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === taskId ? { ...task, ...updatedTask, assignee: updatedTask.assignee } : task
//     );
//     setTasks(updatedTasks);
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };
//   const deleteTask = (taskId) => {
//     const updatedTasks = tasks.filter((task) => task.id !== taskId);
//     setTasks(updatedTasks);
//   };

//   return (
//     <TaskContext.Provider
//       value={{ tasks, addTask, editTask, deleteTask}}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

// custom hook named useTaskContext. It uses useContext to access the TaskContext and throws an error if it's used outside of a TaskProvider.
// This hook will be used by components to access the state and functions provided by the TaskProvider.
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // used to fetch tasks from an API (simulated with fetchTasksFromApi) when the component mounts.

    const fetchTasks = async () => {
      try {
        const storedTasks = await fetchTasksFromApi();
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []); // Run once on mount

  //simulates fetching tasks from an API (after a delay of 1000 milliseconds) and resolves a promise with the retrieved tasks. It uses localStorage to store and retrieve tasks.

  const fetchTasksFromApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        resolve(storedTasks);
      }, 1000);
    });
  };

  const updateTasksInLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = async (task) => {
    const newTask = { ...task, assignee: task.assignee };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    updateTasksInLocalStorage(newTasks);
    return newTask;
  };

  const editTask = async (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, ...updatedTask, assignee: updatedTask.assignee }
        : task
    );

    setTasks(updatedTasks);
    updateTasksInLocalStorage(updatedTasks);

    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
    updateTasksInLocalStorage(updatedTasks);

    return null; // Indicate success without returning any data
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
