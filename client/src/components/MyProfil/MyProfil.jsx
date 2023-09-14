import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./myProfil.css";

const MyProfil = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [updatedWeight, setUpdatedWeight] = useState("");
  const [updatedRecord, setUpdatedRecord] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/userInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserInfo(data);
    };

    fetchUserInfo();
  }, []);

  const deleteUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error("Failed to delete user");
    }
  };

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: updatedWeight,
        record: updatedRecord,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setUserInfo({ ...userInfo, ...data });
    } else {
      console.error("Failed to update user");
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <header>
          <h1>My Profile</h1>
        </header>
        <h3>{userInfo.username}</h3>
        <p>{userInfo.email}</p>
        <h3>Your journal:</h3>
        <div>
          <h5>
            Current weight: <span>{userInfo.weight || "N/A"}kg</span>
          </h5>
          <h5>
            Record bench press: <span>{userInfo.record || "N/A"}kg</span>
          </h5>
          <input
            type="number"
            placeholder="Update weight"
            onChange={(e) => setUpdatedWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Update record"
            onChange={(e) => setUpdatedRecord(e.target.value)}
          />
          <button onClick={updateUser}>Edit</button>
        </div>
        <button className="delete" onClick={deleteUser}>
          Delete Profile
        </button>
      </main>
      <Footer />
    </>
  );
};

export default MyProfil;
