import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";  // <-- Add this import
import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "../../styles/subpage_styles/profile.css";

function ProfileEmployer() {
  const [employer, setEmployer] = useState({});
  let [searchParams] = useSearchParams();  // <-- Here we use useSearchParams
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

  // Only update when the employer data changes
  useEffect(() => {
    if (employer && employer.emp_id) {
      // Handle any additional logic here if needed
    }
  }, [employer]);

  if (!employer || !employer.emp_id) {
    return null; // Return nothing if employer is not found
  }

  // Extract latitude and longitude from the Google Maps link
  const googleMapsLinkPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = employer.emp_address ? employer.emp_address.match(googleMapsLinkPattern) : null;

  let center;

  if (match) {
    center = { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  } else {
    center = { lat: -34.397, lng: 150.644 }; // Default fallback coordinates
  }

  // Google Maps setup
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
              {/* Load Google Maps */}
              <LoadScript googleMapsApiKey={"AlzaSyTNQ-CNk64pkOhrz10duLhmMwH2oyBf6-B"}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                >
                  {/* Marker at employer's location */}
                  {match && (
                    <Marker position={center} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          {/* Right side content remains unchanged */}
        </div>
      </div>
    </main>
  );
}

export default ProfileEmployer;
