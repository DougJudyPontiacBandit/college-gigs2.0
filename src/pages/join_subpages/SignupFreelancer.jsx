import React from "react";
import { axiosFetch } from "../../utils/axios";
import "../../styles/subpage_styles/signup_freelancer.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupFreelancer() {

  const navigate = useNavigate();

  async function handleRegisterFreelancer(e) {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = await axiosFetch.post("/freelancer/register", formData);

      if (data.status !== 200) {
        throw new Error(data.statusText);
      }

      toast.success("Freelancer registered successfully!");
      navigate("/login/freelancer");
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="sign_log_container container-signup">
      <div className="header">
        <h1 className="login_header">Freelancer Signup</h1>
      </div>
      <div className="form-cont">
        <form
          onSubmit={handleRegisterFreelancer}
          method="post"
          action=""
          encType="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="f_name" required />

          <label htmlFor="age">Age</label>
          <input type="text" id="age" name="f_age" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="f_email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="f_password" required />

          <label htmlFor="school">School</label>
          <select type="text" id="school" name="f_school" required>
            <option value="University of San Carlos: Talamban Campus">
              University of San Carlos: Talamban Campus
            </option>
            <option value="University of San Carlos: Downtown Campus">
              University of San Carlos: Downtown Campus
            </option>
            <option value="University of San Carlos: North Campus">
              University of San Carlos: North Campus
            </option>
            <option value="University of Cebu: Banilad">
              University of Cebu: Banilad
            </option>
            <option value="University of Cebu: Lapu-Lapu">
              University of Cebu: Lapu-Lapu
            </option>
            <option value="Others">Others</option>
          </select>

          <label htmlFor="level">Current Year Level</label>
          <select type="text" id="level" name="f_level" required>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
            <option value="Nth Year">Nth-Year/ Greater than 4 Years</option>
          </select>

          <label htmlFor="course">Course</label>
          <input type="text" id="course" name="f_course" required />

          <label htmlFor="port">Portfolio Link</label>
          <input type="text" id="port" name="f_portfolio" />

          <label htmlFor="fb">FaceBook Link</label>
          <input type="text" id="fb" name="f_fb" />

          <label htmlFor="insta">Instagram Link</label>
          <input type="text" id="insta" name="f_insta" />

          <label htmlFor="linked">LinkedIn Link</label>
          <input type="text" id="linked" name="f_linkedin" />

          <label htmlFor="tweet">Twitter Link</label>
          <input type="text" id="tweet" name="f_twitter" />

          <label htmlFor="pfp">Upload Profile Picture</label>
          <input type="file" id="myFile" name="f_pfp" />

          <button type="submit" name="signup">
            Sign Up
          </button>
        </form>

        {/* {missingFieldsError && (
          <div className="error-message">
            <br />
            <p>Please fill out all fields.</p>
          </div>
        )} */}

        <br />
        <div className="existing-account">
          <p>
            Already have an account? <Link to="/Login/freelancer">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupFreelancer;
