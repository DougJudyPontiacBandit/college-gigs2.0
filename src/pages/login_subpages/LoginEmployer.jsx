import React from "react";
import { axiosFetch } from "../../utils/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkMissingInputs } from "../../utils/helper";
import { useNavigate } from "react-router-dom"
import "../../styles/login_subpage.css";

function LoginEmployer({ isLoggedIn, setIsLoggedIn }) {

  const navigate = useNavigate();

  async function handleLoginEmployer(e) {
    e.preventDefault();
    try {
      let inputs = {
        emp_email: e.target.email.value,
        emp_password: e.target.password.value,
      };

      const data = await axiosFetch.post("/employer/login", inputs);

      if (data.status !== 200) {
        throw new Error(data.data.message);
      }
      toast.success("Employer logged in successfully!");
      setIsLoggedIn(true);
      localStorage.setItem("userDetails", JSON.stringify(data.data.employer));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/user/profile/employer");

    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="sign_log_container container-login">
      <div className="header">
        <h1 className="login_header" id="login_header_head">Employer Login</h1>
      </div>
      <div className="form-cont">
        <form onSubmit={handleLoginEmployer} method="post" action=""
          encType="multipart/form-data"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Please enter your email..."
            required
          ></input>{" "}
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Please enter your password..."
            required
          ></input>{" "}
          <br />
          <br />
          <button type="submit" name="l_employer">
            Login
          </button>
        </form>

        <div className="error-message">
          {/* {missingFieldsError && <p>Please fill out all fields.</p>} */}
          <br />
          <p>
            Not an Employer?{" "}
            <strong>
              <Link to="/Login/freelancer">Login</Link>
            </strong>{" "}
            as a Free-Lancer now!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginEmployer;
