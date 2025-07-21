import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { register as registerUser } from "../api/user-api"; // Use the register function and alias it as registerUser

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

 const handleRegister = async () => {
    // Validate các trường
    if (!email || !name || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
    }

    try {
        const newUser = { email, name, password };
        const response = await registerUser(newUser);

        if (response) {
            toast.success("Registration successful!");
            navigate("/login");
        }
    } catch (error) {
        console.error("Registration error:", error);
        toast.error(error.message || "Registration failed. Please try again.");
    }
};

  return (
    <div>
      <Header />
      <div className="position-relative">
        <img
          src="https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/640776f5bf589aa0c82c42e4_movie%20poster%20design.jpg"
          className="img-fluid position-absolute w-100 h-100"
          alt="Background"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow" style={{ maxWidth: "400px", zIndex: 1 }}>
            <h1 className="text-center mb-4">Register</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Fullname</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Fix here
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleRegister}>
              Register
            </button>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
