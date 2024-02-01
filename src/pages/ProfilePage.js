import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import Profile from "../components/Profile";
import "../App.css";
// import MiniDrawer from '../components/MiniDrawer';
const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { tasks } = useTaskContext();

  const userTasks = tasks.filter((task) => task.assignee === currentUser.id);

  return (
    <div className="profile-container" >
      <h2>Profile</h2>
      <Profile user={currentUser} />
    </div>
  );
};

export default ProfilePage;
