import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Login = () => {
  const url = "http://localhost:9002/api/signIn"; // Backend API endpoint
  const navigate = useNavigate(); // Navigation function
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    axios.post(url, user, { withCredentials: true }) // Enable sending cookies
      .then((response) => {
        console.log(response.data);
        if (response.data.user.role === 'user') {
          navigate('/');
        } else {
          navigate('/admin');
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError('Invalid email or password.'); // Display error message
      });
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)',
          height: '300px',
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)',
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Log in</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
            <MDBBtn className="w-100 mb-4" size="md" type="submit">
              Log in
            </MDBBtn>
          </form>

          <div className="text-center">
            <p>or log in with:</p>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>

          <p className="mt-3">
            Don't have an account?{' '}
            <Link to="/SignUp" style={{ color: '#1266f1' }}>
              Sign up
            </Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;