import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import "../../styles/subpage_styles/profile.css";

function ProfileFreelancer() {
  const [freelancer, setFreelancer] = useState();
  const [rating, setRating] = useState(0); // Add state for rating
  const [review, setReview] = useState(""); // Add state for review
  const [submitted, setSubmitted] = useState(false); // Add state for review submission
  let [searchParams] = useSearchParams();
  const freelancer_id = searchParams.get("f_id");

  async function getFreelancerById() {
    try {
      const data = await axiosFetch.get(`/freelancer?f_id=${freelancer_id}`);
      if (data.status !== 200) throw new Error(data.statusText);

      setFreelancer(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setFreelancer(JSON.parse(localStorage.getItem("userDetails")));

    if ((!freelancer || freelancer_id !== freelancer.f_id) && freelancer_id) {
      getFreelancerById();
    }
  }, [freelancer_id, freelancer]);

  if (!freelancer) {
    return <></>;
  }

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmitReview = () => {
    if (isOwnProfile) {
      toast.error("You cannot review your own profile.");
      return;  // Prevent submission if it's the user's own profile
    }
  
    if (!rating || !review) {
      toast.error("Please provide a rating and review.");
      return;
    }
  
    // Logic to submit the review (e.g., send to API)
    setSubmitted(true);
    toast.success("Review submitted successfully.");
  };
  

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = freelancer.f_id === freelancer_id;

  return (
    <main>
      <div className="profile-container">
        <div className="profile">
          <div className="left-side">
            <div className="personal-info">
              {/* <img src="../../utils/Black.jpg" alt="Profile" /> */}
              <img src={`http://localhost:6969/${freelancer.f_pfp}`} alt="Profile" />
              <h2>Hey there! My name is </h2>
              <h1>{freelancer.f_name}</h1>
              <p>Age: <b>{freelancer.f_age}</b></p>
              <p>Studies: <b>{freelancer.f_school}</b></p>
              <p>Current Year Level: <b>{freelancer.f_level}</b></p>
              <p>Course: <b>{freelancer.f_course}</b></p>
            </div>
          </div>

          <div className="right-side">
            {freelancer.works ? freelancer.works.map((work, index) => {
              return (
                <>
                  <h2
                    style={{
                      textAlign: "center",
                      margin: "30px auto",
                      fontSize: "20px",
                    }}
                  >
                    {" "}Work {index}
                  </h2>
                  <p>Work Name: <b>{work.f_name}</b></p>
                  <p>Work Email: <b>{work.f_email}</b></p>
                  <p>Work Type: <b>{work.f_work}</b></p>
                  <p>Price Range: <b>{work.f_price}</b></p>
                  <p>Working Time: <b>{work.f_time}</b></p>
                  <p>Working days:{" "} <b>{work.sdate} to {work.edate}</b></p>
                  <p>Work Description: <b>{work.description}</b></p>
                </>
              );
            }) : <></>}

            <div className="social-links">
              <h3>Connect with me</h3>
              <ul>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_fb}>
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_twitter}>
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_linkedin}>
                    <i className="fa fa-linkedin-square"></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_insta}>
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul>
              {(!freelancer_id || freelancer.f_id === freelancer_id) && (
                <center>
                  <Link to="/user/update/freelancer">
                    <button>Edit Profile Information</button>
                  </Link>
                </center>
              )}
            </div>
          </div>

          {/* Only show rating and review if it's not the logged-in user's own profile */}
          {!isOwnProfile && (
            <div className="right-side">
              <h3>Rate and Review</h3>
              <div className="rating-container">
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <label
                      key={index}
                      className={`star ${rating > index ? 'filled' : ''}`}
                      onClick={() => handleStarClick(index)}
                    ></label>
                  ))}
                </div>
                <p>{rating} {rating === 1 ? "star" : "stars"}</p>
              </div>
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                cols="50"
              />
              <button onClick={handleSubmitReview}>Submit Review</button>
              {submitted && <p>Your review has been submitted!</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProfileFreelancer;
