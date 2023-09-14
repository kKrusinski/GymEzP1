import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status !== 201) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/myProfil");
    } catch (error) {
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <label>Sign Up</label>
          {error && <p>{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm"
            placeholder="confirm password"
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
