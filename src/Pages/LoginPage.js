import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import backgroundImage from "../city-1283801.jpg"; // Import your background image

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API + "/login", formData);
      const code = response.status;
      const successMsg = response.data.message;
      if (code === 200) {
        const token = response.data.token;
        console.log("token", token);
        localStorage.setItem("token", token);
        toast.success(successMsg);
        navigate("/home");
      } else {
        const errorMsg = response.data.message;
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.response.data.message;
      toast.error(errorMsg);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Container style={{ height: "100vh" , alignContent: "center", justifyContent: "center", maxWidth: "1000px"}}>
        <Row className="justify-content-center mt-5">
          <Col md={6}></Col>
          <Col md={6}>
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "30px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}>
              <h1 className="text-center">Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChanges}
                    value={formData.email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password  :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChanges}
                    value={formData.password}
                  />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit" className="mb-2">
                  Login
                </Button>
              </Form>
              <p className="text-center" style={{ marginTop: "1rem", fontSize: "20px" }}>
                Don't have an account?{" "}
                <a href="/" className="btn btn-primary">
                  Register Now
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
