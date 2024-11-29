import React from "react";
import "../styles/join.css";
import { Link } from "react-router-dom";

function Join() {
  return (
    <div className="sign_log_container container-menu">
      <div className="join-container">
        <Link
          to="/join/freelancer"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="join-freelancer">
            <h2>Freelancer Signup</h2>
          </div>
        </Link>

        <Link
          to="/join/employer"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="join-employer">
            <h2>Employer Signup</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Join;
