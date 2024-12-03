import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const url = "http://localhost:9002/api/users";
  const navigate = useNavigate();

  // State for form input
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request with user data
    axios
      .post(url, user)
      .then((response) => {
        alert(response.data.msg); // Show success message as an alert
        setUser({ userName: "", email: "", password: "" }); // Clear form fields
        navigate("/Login"); // Redirect to login page
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.msg); // Show error message as an alert
        } else {
          alert("An unexpected error occurred. Please try again."); // Fallback error message
        }
        console.error("Error during signup:", error);
      });
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage: "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Sign up now</h2>

          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="UserName"
              id="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
            />

            <MDBBtn className="w-100 mb-4" size="md" type="submit">
              Sign up
            </MDBBtn>
          </form>

          <div className="text-center">
            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
              {/* Social Icons */}
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;