
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { axiosFetch } from "../../utils/axios";
import "../../styles/subpage_styles/update_profile.css"

function UpdateProfileFreelancer() {

  const navigate = useNavigate();

  async function handleUpdateProfileFreelancer(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const data = await axiosFetch.post("/freelancer/update", formData);

      if (data.status !== 200) {
        throw new Error(data.statusText);
      }

      toast.success("Freelancer updated account successfully!");
      localStorage.setItem("userDetails", JSON.stringify(data.data.freelancer));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/user/profile/freelancer");
    } catch (e) {
      toast.error(e.message);
    }

  }

  return (
    <div className="container">
      <div className="preview-container">
        <h2>Profile Preview</h2>
        <section className="preview">
          <img id="preview-profile-picture" src="/College_Gigs/Blank.jpg" alt="Profile" />
          <div className="personal-info preview-container">
            <h2>Name: <span id="preview-name"></span></h2>
            <p>Age: <span id="preview-age"></span></p>
            <p>University: <span id="preview-university"></span></p>
            <p>Year Level: <span id="preview-year-level"></span></p>
            <p>Course: <span id="preview-course"></span></p>
            <p>Portfolio: <span id="preview-portfolio"></span></p>
            <p>Facebook: <span id="preview-facebook"></span></p>
            <p>Instagram: <span id="preview-instagram"></span></p>
            <p>LinkedIn: <span id="preview-linkedin"></span></p>
            <p>Twitter: <span id="preview-twitter"></span></p>
          </div>
        </section>
      </div>
      <section className="edit-form">
        <h2>Edit Profile Information</h2>
        <form onSubmit={handleUpdateProfileFreelancer} encType="multipart/form-data" method="post">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="f_name" />

          <label htmlFor="age">Age</label>
          <input type="text" id="age" name="f_age" />

          <label htmlFor="school">School</label>
          <select type="text" id="school" name="f_school" >
            <option value="">----------</option>
            <option value="University of San Carlos: Talamban Campus">University of San Carlos: Talamban Campus</option>
            <option value="University of San Carlos: Downtown Campus">University of San Carlos: Downtown Campus</option>
            <option value="University of San Carlos: North Campus">University of San Carlos: North Campus</option>
            <option value="University of Cebu: Banilad">University of Cebu: Banilad</option>
            <option value="University of Cebu: Lapu-Lapu">University of Cebu: Lapu-Lapu</option>
            <option value="Others">Others</option>
          </select>

          <label htmlFor="level">Current Year Level</label>
          <select type="text" id="level" name="f_level">
            <option value="">----------</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
            <option value="Nth Year">Nth-Year/ Greater than 4 Years</option>
          </select>

          <label htmlFor="course">Course</label>
          <input type="text" id="course" name="f_course" />

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

          <div className="button-container">
            <button type="submit" name="show">Show Preview</button>
            <button type="submit" name="save">Save Profile Information</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateProfileFreelancer;