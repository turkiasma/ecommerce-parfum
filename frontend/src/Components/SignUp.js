import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { signUpUser } from '../services/userService'; // Import signUpUser service

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUpUser(user); // Call the signUpUser service
      alert(response.msg); // Show success message
      setUser({ userName: "", email: "", password: "" });
      navigate("/Login"); // Redirect to login page
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.msg); // Show error message
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Error during signup:", error);
    }
  };

  return (
    <MDBContainer 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage: "url(/assets/gold.jpg)",
          height: "300px",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
          width: "100%",
          maxWidth: "500px",
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
            <MDBBtn
              className="w-100 mb-4"
              size="md"
              type="submit"
              style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}
            >
              Sign up
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;