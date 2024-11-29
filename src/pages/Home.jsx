import React from "react";
import { Link } from "react-router-dom";
import Bg from "../components/resources/background.jpg";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <div className="home_container" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="content" id="home_content">
          <div className="home_content_element header">
            <h1>
              FREE-LANCE WORK FROM <br /> COLLEGE STUDENTS
            </h1>
          </div>

          <div className="home_content_element child-one">
            <p>
              Welcome to <strong>College Gigs</strong>, the ultimate platform
              for Filipino College students looking to showcase their skills and
              build a portfolio while earning some extra cash. Whether you're a{" "}
              <strong>
                talented writer, designer, developer, or anything in between.
              </strong>
              This is the perfect place to connect with potential employers who
              are looking for the unique skills that only college students
              possess.
            </p>
          </div>
          <div className="home_content_element child-two">
            <p>
              <strong>
                Join the College Gigs community today and take the <br />
                first step towards building a successful career <br />
                while still in college!
              </strong>
            </p>
          </div>
          <div className="home_content_element child-three">
            <a
              href="https://www.discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>JOIN DISCORD</button>
            </a>
            <Link to="/Services">
              <button>FIND SERVICES</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
