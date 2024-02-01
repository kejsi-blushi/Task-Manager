import React from "react";
import PropTypes from "prop-types";
import TaskList from "./TaskList";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Avatar from "@mui/material/Avatar";

const Profile = ({ user }) => {
  const getUserInitials = (user) => {
    const firstNameInitial = user.fname ? user.fname.charAt(0) : "";
    const lastNameInitial = user.lname ? user.lname.charAt(0) : "";

    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  const userInitials = getUserInitials(user);

  return (
    <>
      <div className="profile-header">
        <div className="avatar-container">
          <Avatar sx={{ color: "#024d9c", bgcolor: "#ffff" }}>{userInitials}</Avatar>
        </div>
        <div className="user-info">
          <p className="username">User: {user.username}</p>
          <p className="role">Role: {user.role}</p>
        </div>
      </div>

      <div className="profile-details">
        <p>Name: {user.fname}</p>
        <p>Surname: {user.lname}</p>
        <p>Email: {user.email}</p>


        {/* <h3>Tasks Assigned to {user.username}</h3> */}
        {/* {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <p>No tasks assigned to {user.username}.</p>
        )} */}
      </div>
    </>
  );
};

export default Profile;
