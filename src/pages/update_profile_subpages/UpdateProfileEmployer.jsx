import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import { useNavigate } from "react-router-dom"
import "../../styles/subpage_styles/update_profile_emp.css"

function UpdateProfileEmployer() {


  const navigate = useNavigate();

  async function handleUpdateProfileEmployer(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const data = await axiosFetch.post("/employer/update", formData);

      if (data.status !== 200) {
        throw new Error(data.statusText);
      }


      toast.success("Employer updated account successfully!");
      localStorage.setItem("userDetails", JSON.stringify(data.data.employer));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/user/profile/employer");
    } catch (e) {
      toast.error(e.message);
    }

  }

  return (
    <div className="container">
      <div className="preview-container">
        <h2>Profile Preview</h2>
        <section className="preview">
          <img id="preview-profile-picture" src="/College_Gigs/Blank.jpg" alt="Profile Picture" />
          <div className="personal-info preview-container">
            <h2>Name: <span id="preview-name"></span></h2>
            <p>Company Name: <span id="preview-company-name"></span></p>
            <p>Company Address: <span id="preview-company-address"></span></p>
            <p>Company Page: <span id="preview-company-page"></span></p>
            <p>Company FaceBook: <span id="preview-company-fb"></span></p>
            <p>Company Instagram: <span id="preview-company-instagram"></span></p>
            <p>Company LinkedIn: <span id="preview-company-linked-in"></span></p>
          </div>
        </section>
      </div>
      <section className="edit-form">
        <h2>Edit Profile Information</h2>
        <form onSubmit={handleUpdateProfileEmployer} encType="multipart/form-data" method="post">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="emp_name" />

          <label htmlFor="company">Company Name</label>
          <input type="text" id="company" name="emp_comp" />

          <label htmlFor="linked">Company Address<p><i>(can pass a Google Maps embedded src="". Follow these <a href="https://extension.umaine.edu/plugged-in/technology-marketing-communications/web/tips-for-web-managers/embed-map/" target="_blank">steps</a> to find the Share in Google Maps. Only copy what is inside src="")</i></p></label>
          <input type="text" id="address" name="emp_address" />

          <label htmlFor="port">Company Page</label>
          <input type="text" id="port" name="emp_page" />

          <label htmlFor="fb">Company FaceBook</label>
          <input type="text" id="fb" name="emp_fb" />

          <label htmlFor="insta">Company Instagram Link</label>
          <input type="text" id="insta" name="emp_insta" />

          <label htmlFor="linked">Company LinkedIn Link</label>
          <input type="text" id="linked" name="emp_linkedin" />

          <label htmlFor="pfp">Upload Profile Picture</label>
          <input type="file" id="myFile" name="emp_pfp" />

          <div className="button-container">
            <button type="submit" name="show">Show Preview</button>
            <button type="submit" name="update">Save Profile Information</button>
          </div>
        </form>
      </section>
    </div>

  );
}

export default UpdateProfileEmployer