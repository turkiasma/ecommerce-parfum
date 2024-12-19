import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { loginUser } from '../services/userService'; // Import the loginUser service

const Login = () => {
  const navigate = useNavigate(); // Navigation function
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await loginUser(user); // Use the loginUser service
      console.log('Login successful:', response);

      if (response.user.role === 'user') {
        navigate('/'); // Redirect to user dashboard
      } else {
        navigate('/admin'); // Redirect to admin dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.msg || 'Invalid email or password.'); // Display error message
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
          backgroundImage: 'url(/assets/gold.jpg)',
          height: '300px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)',
          width: '100%',
          maxWidth: '500px',
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
            <Link to="/SignUp" style={{ color: 'black' }}>
              Sign up
            </Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
