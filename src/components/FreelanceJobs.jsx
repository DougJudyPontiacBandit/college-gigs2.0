import React from "react";
import { Link } from "react-router-dom"
import '../styles/freelancejob.css'

function FreelanceJobs({ jobs }) {

  const isAuthenticated = localStorage.getItem("token");
  const isEmployer = isAuthenticated && Boolean(JSON.parse(localStorage.getItem("userDetails")).emp_id)

  return (
    <>
      {
        jobs.map((job, index) => {
          if (job.emp_id) return <></>

          return (
            <div key={job.f_id} className="work-box">
              <div className="work-thumbnail work-component">
                {/* <img src="' . $pfpDirectory . '" alt="Work 1"> */}
                <img src="https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg" alt="Profile" />
              </div>
              <div className="work-details work-component">
                <h3>{job.f_name}</h3>
              </div>
              <div className="work-details work-component">
                <Link to={`/user/profile/freelancer?f_id=${job.f_id}`}><h2><i className="fa fa-id-badge" style={{ fontSize: "30px" }} />{" "}View Profile</h2></Link>
              </div>
              <div className="work-details work-component">
                <h3>{job.f_price}</h3>
              </div>
              <div className="work-details work-component">
                <div className="work-details-button">
                  {isEmployer && <Link to={`/payment?work_id=${job.w_id}`}><button><i className="fa fa-handshake-o" style={{ fontSize: "20px", marginRight: "10px", textAlign: "center" }}></i>Hire</button></Link>}
                </div>

              </div>
            </div>
          )
        })
      }
    </>
  )
}




export default FreelanceJobs;