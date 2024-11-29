import React from "react";
import "../styles/services.css";
import GDesign from "../components/resources/services_pictures/graphic_design.jpeg";
import Writing from "../components/resources/services_pictures/writing.jpeg";
import Programming from "../components/resources/services_pictures/programming.jpeg";
import Dmarketing from "../components/resources/services_pictures/digital_marketing.jpeg";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div id="services">
      <div id="services_container">
        <div id="services_header">
          <h1>Welcome to College Gigs</h1>
          <p>
            Get things done with just five dollars. Find freelance services for
            your business or personal projects
          </p>
        </div>
        <div id="services_content">
          <div className="services_section" id="popular_services">
            <p className="services_title">Popular Categories:</p>
            <div className="services_grid">
              <div className="services_tile first-child">
                <Link to="/jobs/design">
                  <img src={GDesign} alt="Graphic Design" />
                </Link>
                <p>Graphic Design</p>
              </div>

              <div className="services_tile second-child">
                <Link to="/jobs/writing">
                  <img src={Writing} alt="Writing" />
                </Link>
                <p>Writing</p>
              </div>

              <div className="services_tile third-child">
                <Link to="/jobs/programming">
                  <img src={Programming} alt="Programming" />
                </Link>
                <p>Programming</p>
              </div>

              <div className="services_tile fourth-child">
                <Link to="/jobs/marketing">
                  <img src={Dmarketing} alt="Digital Marketing" />
                </Link>
                <p>Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
