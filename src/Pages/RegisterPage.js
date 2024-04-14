import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../road-7525091.jpg"; // Import your background image

const RegitserForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "Male",
    hobbies: [],
    profile_pic: null,
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_pic: e.target.files[0],
    });
  };

  const handleHobbyChange = (e) => {
    setFormData({
      ...formData,
      hobbies: e.target.value.trim().split(/\s*,\s*/),
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("firstname", formData.firstname);
      data.append("lastname", formData.lastname);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("gender", formData.gender);
      data.append("hobbies", formData.hobbies.join(","));
      data.append("profile_pic", formData.profile_pic);

      const response = await axios.post("http://localhost:3050/register", data);
      const code = response.status;
      const successMsg = response.data.message;
      if (code === 200) {
        toast.success(successMsg);
        navigate("/login");
      }
    } catch (err) {
      const code = err.response.status;
      const errorMsg = err.response.data.message;
      if (code === 409 || 500 || 400) {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          gender: "Male",
          hobbies: [],
          profile_pic: null,
        });
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="shadow p-5 rounded"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <h1 className="text-center mb-4">Registration</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstname"
              onChange={handleChanges}
              value={formData.firstname}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastname"
              onChange={handleChanges}
              value={formData.lastname}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handleChanges}
              value={formData.email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChanges}
              value={formData.password}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Hobbies (e.g., Reading, Sports, Music) (Comma separated)"
              name="hobbies"
              onChange={handleHobbyChange}
              value={formData.hobbies.join(", ")}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="gender"
              onChange={handleChanges}
              value={formData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              name="profile_pic"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="btn btn-link">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegitserForm;