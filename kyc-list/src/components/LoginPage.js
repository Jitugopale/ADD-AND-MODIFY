import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar.js";
import img from "./images/back2.jpg";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setMessage(""); // Clear any previous message
  
    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post("http://localhost:5000/login", {
        UserName: userId,
        Password: password,
      });
  
      // Check if login is successful
      if (response.data.message === "Login successful") {
        setMessage("Login successful!"); // Set success message
        console.log(response.data); // Add this line to check the response

  
        // Store the auth token and other data in localStorage
        console.log("Before storing token:", response.data.authToken);
localStorage.setItem("token", response.data.authToken);
console.log("Token stored:", localStorage.getItem("token"));
  
        // Navigate to the KYC List page
        navigate("/kyc-list");
      } else {
        setError("Login failed. Please check your credentials."); // If response doesn't match "Login successful"
      }
    } catch (err) {
      // Handle error if login fails or server is unreachable
      setError(err.response?.data?.error || "Server not reachable.");
    }
  };
  

  return (
    <>
      <div style={{ backgroundImage: `url(${img})`, height: "100vh" }}>
        <MainNavbar />
        <div
          className="container-fluid d-flex align-items-center justify-content-center"
          style={{ marginTop: "70px" }}
        >
          <div className="card shadow" style={{ width: "400px" }}>
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    USERNAME *
                  </label>
                  <input
                    type="text"
                    id="userId"
                    className="form-control"
                    placeholder="Username"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    PASSWORD *
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  LOGIN
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {message && (
                <div className="alert alert-success mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
