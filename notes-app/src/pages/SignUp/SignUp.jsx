import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import Login from "../Login/Login";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();

  if (!name) {
    setError("Please enter your name");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email");
    return;
  }

  if (!password) {
    setError("Please enter a password");
    return;
  }

  setError("");

  try {
    const response = await axiosInstance.post("/createAccount", {
      fullName: name,
      email: email,
      password: password, // Send password as plain text
    });

    if (response.data && response.data.error) {
      setError(response.data.message);
      return;
    }

    if (response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong");
    }
  }
};

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account? 
              <Link to="/login" className="font-medium text-primary underline">
                {" "}
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
