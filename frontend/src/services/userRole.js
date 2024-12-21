import {jwtDecode} from "jwt-decode";

export function UserRole() {
  const token = getCookie("authToken"); // Retrieve the authToken from cookies
  console.log("Retrieved Token:", token); // Debugging log

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded Token:", decodedToken); // Debugging log
      return decodedToken.role || null; // Extract the role or return null
    } catch (error) {
      console.error("Token decoding error:", error); // Log any decoding errors
      return null;
    }
  }

  console.log("No token found"); // Warn if no token is present
  return null; // No token means unauthenticated user
}

// Helper function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    console.log(`Cookie [${name}] Value:`, cookieValue); // Debugging log
    return cookieValue;
  }

  console.warn(`Cookie [${name}] not found`); // Warn if the cookie is not found
  return null;
}
