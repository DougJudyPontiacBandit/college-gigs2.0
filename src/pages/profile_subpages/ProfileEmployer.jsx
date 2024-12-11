import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";  
import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "../../styles/subpage_styles/profile.css";

function ProfileEmployer() {
  const [employer, setEmployer] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  let [searchParams] = useSearchParams();
  const employer_id = searchParams.get("emp_id");

  const getEmployerById = useCallback(async function (id) {
    try {
      const data = await axiosFetch.get(`/employer?emp_id=${id}`);
      if (data.status !== 200) throw new Error(data.statusText);
      setEmployer(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    const employerDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (employerDetails) {
      setEmployer(employerDetails);
    }

    if (employer_id) {
      getEmployerById(employer_id);
    }
  }, [employer_id, getEmployerById]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmitReview = () => {
    if (!rating || !review) {
      toast.error("Please provide a rating and review.");
      return;
    }
    // Logic to submit the review (e.g., send to API)
    setSubmitted(true);
    toast.success("Review submitted successfully.");
  };

  // Google Maps setup
  const googleMapsLinkPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = employer.emp_address ? employer.emp_address.match(googleMapsLinkPattern) : null;

  let center;

  if (match) {
    center = { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  } else {
    center = { lat: -34.397, lng: 150.644 }; // Default fallback coordinates
  }

  const containerStyle = {
    width: '100%',
    height: '300px'
  };

  return (
    <main>
      <div className="profile-container">
        <div className="profile">
          <div className="left-side" id="emp">
            <div className="personal-info">
 <img src={`http://localhost:6969/${employer.emp_pfp}`} alt="Profile" />
              <h2>Hey there! My name is </h2><h1>{employer.emp_name}</h1>
              <p>Contact Me: <b>{employer.emp_email}</b></p>
              <p>I work for: <b>{employer.emp_comp}</b></p>
            </div>
            <div className="map-container">
              <h3>Find Us At</h3>
              <LoadScript googleMapsApiKey={"AlzaSyTNQ-CNk64pkOhrz10duLhmMwH2oyBf6-B"}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                >
                  {match && (
                    <Marker position={center} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

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
        </div>
      </div>
    </main>
  );
}

export default ProfileEmployer;