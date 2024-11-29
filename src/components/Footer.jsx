import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import FacebookIcon from "./resources/ico/facebook.png";
import TwitterIcon from "./resources/ico/twitter-sign.png";
import InstagramIcon from "./resources/ico/instagram.png";

function Footer() {
  return (
    <div className="footer">
      <div className="container-footer" id="footer_container">
        <div className="footer-links">
          <div className="footer-links-link">
            <Link to="/About">About</Link>
            <Link to="/Contact">Contact Us</Link>
          </div>
        </div>
        <div className="rights-reserved">
          <p>&copy; 2024 CollegeGigs. All rights reserved. </p>
        </div>
        <div className="social-media">
          <div className="social-media-components">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fb"
            >
              <img
                src={FacebookIcon}
                alt="facebook icon"
                className="sc facebook"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fb"
            >
              <img
                src={TwitterIcon}
                alt="twitter icon"
                className="sc twitter"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fb"
            >
              <img
                src={InstagramIcon}
                alt="instagram icon"
                className="sc instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
