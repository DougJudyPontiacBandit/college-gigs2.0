import React from "react";
import "../styles/contact.css";

function Contact() {
  return (
    <div id="contact">
      <div id="contact_container">
        <div className="header" id="contact_header">
          <h1>Contact Us</h1>
        </div>
        <form
          id="contact_form"
          action="/College_Gigs/C_Gigs_Home.php"
          method="post"
        >
          <div className="contact_form_item">
            <label htmlFor="email">
              <i className="fa fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="contact_input"
              required
            />
          </div>

          <div className="contact_form_item">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="contact_input"
            />
          </div>

          <div className="contact_form_item">
            <label htmlFor="desc">
              <i className="fa fa-commenting-o"></i> Description
            </label>
            <textarea
              id="desc"
              name="desc"
              className="desc contact_input"
              placeholder="Describe your issue here..."
            ></textarea>
          </div>

          <button type="submit" name="send">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
