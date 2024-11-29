import React from "react";
import { useNavigate } from "react-router-dom"
import { checkMissingInputs } from "../../utils/helper";
import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import { Link } from "react-router-dom";

function LoginFreelancer({ isLoggedIn, setIsLoggedIn }) {

  const navigate = useNavigate();

  async function handleLoginFreelancer(e) {
    e.preventDefault();
    try {
      let inputs = {
        f_email: e.target.email.value,
        f_password: e.target.password.value,
      };

      const data = await axiosFetch.post("/freelancer/login", inputs);

      if (data.status !== 200) {
        throw new Error(data.data.message);
      }
      setIsLoggedIn(true)
      toast.success("Freelancer logged in successfully!");
      localStorage.setItem("userDetails", JSON.stringify(data.data.freelancer));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/user/profile/freelancer");
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="sign_log_container container-login">
      <div className="header">
        <h1 className="login_header">Freelancer Login</h1>
      </div>
      <div className="form-cont">
        <form onSubmit={handleLoginFreelancer} method="post" action=""
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
          <button type="submit" name="l_freelancer">
            Login
          </button>
        </form>

        <div className="error-message">
          {/* {missingFieldsError && <p>Please fill out all fields.</p>} */}
          <br />
          <p>
            Not a Freelancer?{" "}
            <strong>
              <Link to="/Login/employer">Login</Link>
            </strong>{" "}
            as an Employer now!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFreelancer;
