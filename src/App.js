import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import UserManagement from "./pages/UserManagement";
import PrivateRoute from "./components/PrivateRoute";
import AddTask from "./pages/AddTask";
import { TaskProvider } from "./context/TaskContext";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardHome from "./components/DashboardHome";
import TaskListPage from "./pages/TaskListPage";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<DashboardHome />}>
              <Route path="" element={<Dashboard />}></Route>
              <Route
                path="user-management"
                element={<PrivateRoute Component={UserManagement} />}
              />
              <Route
                path="add-task"
                element={<PrivateRoute Component={AddTask} />}
              />
              <Route path="task/:id" element={<TaskDetailsPage />}>
                <Route path="edit" element={<AddTask />} />
              </Route>

              <Route path="profile" element={<ProfilePage />} />
              <Route path="task-list" element={<TaskListPage />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
