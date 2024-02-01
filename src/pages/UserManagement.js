import React, { useEffect, useState } from "react";
import userList from "../context/userList";
import "../App.css";
import PersonIcon from "@mui/icons-material/Person";
// import MiniDrawer from "../components/MiniDrawer";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const developerUsers = userList.filter((user) => user.role !== "manager");
    setUsers(developerUsers);
    console.log(developerUsers);
  }, []);

  return (
    <div className="user-management-container">
      <h2 className="user-management-heading">User Management</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} className="user-list-item">
            <PersonIcon />
            <p className="user-list-item-text">
              Username: {user.username} <br />
              Role: {user.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
