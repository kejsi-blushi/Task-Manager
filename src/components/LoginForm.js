import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "../App.css";

const LoginForm = () => {
  const [loginError, setLoginError] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const isSuccess = await login(data.username, data.password);

      if (isSuccess) {
        console.log("Login successful!");
        navigate("/dashboard");
      } else {
        console.error("Login failed. Invalid credentials.");
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && (
          <p style={{ color: "red" }}>Invalid username or password.</p>
        )}

        <TextField
          id="username"
          label="Username"
          variant="standard"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
        />
        <br />

        <TextField
          type="password"
          id="password"
          label="Password"
          variant="standard"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
