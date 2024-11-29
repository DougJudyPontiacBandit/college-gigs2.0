import React from "react";
import Logo from "./resources/CollegeGigsLogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/navbar.css";


function Navbar() {
  let isLoggedIn;
  const navigate = useNavigate();
  let isEmployer = true;
  if (localStorage.getItem("userDetails") != null) {
    isLoggedIn = true;
    if (JSON.parse(localStorage.getItem("userDetails")).f_id != null)
      isEmployer = false
  }
  else
    isLoggedIn = false;

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="logo" />
      </div>
      <div className="rightSide">
        <div className="navbar_content">
          <Link to="/"> Home </Link>
          {/* <Link to="/Login"> Login </Link> */}
          {isLoggedIn ? (
            <>
              {isEmployer ?
                <Link to="/user/profile/employer">Profile</Link>
                :
                <>
                  <Link to="/user/profile/freelancer">Profile</Link>
                  <Link to="/freelancer/apply">Apply</Link>
                </>
              }
            </>
          ) : (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/Join"> Join Us </Link>
            </>
          )}

          <Link to="/Services"> Services </Link>
          {isLoggedIn &&
            <Link to={"/"} onClick={handleLogout}>Logout</Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
