import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import HeaderBanner from "../HeaderBanner/HeaderBanner";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setError(data.error);
        return;
      }
      localStorage.setItem("token", data.token);

      navigate("/myProfil");
    } catch (error) {
      setError("Coś poszło nie tak. Spróbuj ponownie później.");
    }
  };

  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <label>Log In</label>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Hasło"
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
        </form>
      </main>
    </>
  );
};

export default LogIn;
