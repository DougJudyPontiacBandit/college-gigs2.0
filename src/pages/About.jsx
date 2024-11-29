import React, { useState } from "react";
import Sirach from "../components/resources/founders/Sirach.JPG";
import Jab from "../components/resources/founders/Jab.jpg";
import Ryka from "../components/resources/founders/ryka.jpg";
import Zraim from "../components/resources/founders/Zraim.jpg";
import James from "../components/resources/founders/James.jpg";


import "../styles/about.css";

const visionText =
  "Our vision is to revolutionize the digital landscape by providing high-quality e-services that seamlessly connect company employers and Filipino college freelancers. We aim to empower businesses with cost-effective solutions starting at a low price of $5, fostering collaboration and mutual growth in the digital economy.";

const missionText =
  "Our mission is to bridge the gap between company employers and college freelancers by offering a diverse range of high-quality e-services. We are committed to providing a user-friendly platform that enables employers to access talented freelancers who can deliver exceptional results at an affordable price point. Through our dedication to excellence, innovation, and fostering a supportive community, we strive to empower freelancers to showcase their skills and help businesses thrive in the digital age.";

function About() {
  const [isVisionVisible, setVisionVisible] = useState(false);
  const [isMissionVisible, setMissionVisible] = useState(false);

  return (
    <div id="about">
      <div id="about_container">
        <div className="about_content" id="about_heading_box">
          <h1 id="about_heading">About Us</h1>
        </div>
        <div id="portfolio">
          <div className="member_container" id="member-2">
            <p>Sirach</p>
            <img src={Sirach} alt="Sirach" className="portrait Sirach" />
          </div>
          <div className="member_container" id="member-3">
            <p>Krizteen</p>
            <img src={Ryka} alt="Ryka" className="portrait ryka" />
          </div>
          <div className="member_container" id="member-4">
            <p>Zraim</p>
            <img src={Zraim} alt="Zraim" className="portrait zraim" />
          </div>
          <div className="member_container" id="member-4">
            <p>James</p>
            <img src={James} alt="James" className="portrait James" />
          </div>
        </div>

        <div id="vm_section">
          <div
            className="vm_card"
            id="vision_card"
            onMouseOver={() => setVisionVisible(true)}
            onMouseOut={() => setVisionVisible(false)}
          >
            <h2 className="vm_card_item vision_heading">Vision</h2>
            <p
              className="vm_card_item vision_content"
              style={{
                display: isVisionVisible ? "block" : "none",
                transition: "display 1s ease",
              }}
            >
              {visionText}
            </p>
          </div>
          <div
            className="vm_card"
            id="mission_card"
            onMouseOver={() => setMissionVisible(true)}
            onMouseOut={() => setMissionVisible(false)}
          >
            <h2 className="vm_card_item mission_heading">Mission</h2>
            <p
              className="vm_card_item mission_content"
              style={{
                display: isMissionVisible ? "block" : "none",
                transition: "display 1s ease",
              }}
            >
              {missionText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
