import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="sign_log_container container-menu">
      <div className="join-container">
        <Link
          to="/login/freelancer"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="join-freelancer">
            <h2>Freelancer Login</h2>
          </div>
        </Link>

        <Link
          to="/login/employer"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="join-employer">
            <h2>Employer Login</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
