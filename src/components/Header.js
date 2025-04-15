import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons, isLoggedIn, handleLogout }) => {
  const history = useHistory();
  
  // Check if user is logged in if not explicitly provided
  const username = localStorage.getItem("username");

  const handleExplore = () => {
    history.push("/");
  };

  // This function will now call the parent component's handleLogout
  const onLogoutClick = () => {
    console.log("Header: Logout button clicked");
    
    // Call the parent's handleLogout function if provided
    if (handleLogout) {
      handleLogout();
    }
    
    // Redirect to home page
    history.push("/");
  };

  // Handle different views based on props and login status
  if (hasHiddenAuthButtons) {
    // View for Login/Register pages
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={handleExplore}
        >
          Back to explore
        </Button>
      </Box>
    );
  } else {
    // View for Products page (both logged in and logged out states)
    // Use the isLoggedIn prop if provided, otherwise check localStorage
    const userIsLoggedIn = isLoggedIn !== undefined ? isLoggedIn : (username !== null);
    
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Stack direction="row" spacing={1} alignItems="center">
          {userIsLoggedIn ? (
            // Logged in view with username, avatar and logout button
            <>
              <Avatar alt={username} src="avatar.png" />
              <p className="username-text">{username}</p>
              <Button onClick={onLogoutClick}>LOGOUT</Button>
            </>
          ) : (
            // Logged out view with login and register buttons
            <>
              <Button onClick={() => history.push("/login")}>LOGIN</Button>
              <Button variant="contained" onClick={() => history.push("/register")}>REGISTER</Button>
            </>
          )}
        </Stack>
      </Box>
    );
  }
};

export default Header;