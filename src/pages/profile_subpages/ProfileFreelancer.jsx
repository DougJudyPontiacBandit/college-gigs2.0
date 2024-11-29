import { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosFetch } from "../../utils/axios";
import "../../styles/subpage_styles/profile.css";

function ProfileFreelancer() {
  const [freelancer, setFreelancer] = useState();
  let [searchParams] = useSearchParams();
  const freelancer_id = searchParams.get("f_id");

  async function getFreelancerById() {
    try {
      const data = await axiosFetch.get(`/freelancer?f_id=${freelancer_id}`);
      if (data.status !== 200) throw new Error(data.statusText);

      setFreelancer(data.data);

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setFreelancer(JSON.parse(localStorage.getItem("userDetails")));

    if ((!freelancer || freelancer_id !== freelancer.f_id) && freelancer_id) {
      getFreelancerById();
    }
  }, []);

  if (!freelancer) {
    return <></>
  }

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
              <p>
                Age: <b>{freelancer.f_age}</b>
              </p>
              <p>
                Studies: <b>{freelancer.f_school}</b>
              </p>
              <p>
                Current Year Level: <b>{freelancer.f_level}</b>
              </p>
              <p>
                Course: <b>{freelancer.f_course}</b>
              </p>
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
                    {" "}
                    Work {index}
                  </h2>
                  <p>
                    Work Name: <b>{work.f_name}</b>
                  </p>
                  <p>
                    Work Email: <b>{work.f_email}</b>
                  </p>
                  <p>
                    Work Type: <b>{work.f_work}</b>
                  </p>
                  <p>
                    Price Range: <b>{work.f_price}</b>
                  </p>
                  <p>
                    Working Time: <b>{work.f_time}</b>
                  </p>
                  <p>
                    Working days:{" "}
                    <b>
                      {work.sdate} to {work.edate}
                    </b>
                  </p>
                  <p>
                    Work Description: <b>{work.description}</b>
                  </p>
                </>
              );
            }) : <></>}

            <div className="social-links">
              <h3>Connect with me</h3>
              <ul>
                <li>
                  <a rel="noopener noreferrer" target=" _blank" href={freelancer.f_fb}>
                    <i
                      className="fa fa-facebook-f"
                      style={{
                        marginRight: "30px",
                        borderRadius: "10px",
                        padding: "7px",
                        paddingLeft: "15px",
                        backgroundColor: "blue",
                        fontSize: "20px",
                        color: "white",
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_twitter}>
                    <i
                      className="fa fa-twitter"
                      style={{
                        marginRight: "30px",
                        borderRadius: "10px",
                        padding: "7px",
                        backgroundColor: "skyblue",
                        fontSize: "20px",
                        color: "white",
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_linkedin}>
                    <i
                      className="fa fa-linkedin-square"
                      style={{
                        marginRight: "30px",
                        borderRadius: "10px",
                        padding: "7px",
                        backgroundColor: "black",
                        fontSize: "20px",
                        color: "white",
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" target="_blank" href={freelancer.f_insta}>
                    <i
                      className="fa fa-instagram"
                      style={{
                        marginRight: "30px",
                        borderRadius: "10px",
                        padding: "7px",
                        backgroundColor: "black",
                        fontSize: "20px",
                        color: "white",
                      }}
                    ></i>
                  </a>
                </li>
              </ul>

              {
                (!freelancer_id || freelancer.f_id === freelancer_id) && (
                  <center>
                    <Link to="/user/update/freelancer" >
                      <button>
                        Edit Profile Information
                      </button>
                    </Link>
                  </center>
                )
              }
            </div>
          </div>
        </div >
      </div>
    </main>
  );
}

export default ProfileFreelancer;
