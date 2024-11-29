import React from "react";
import { axiosFetch } from "../utils/axios";
import 'font-awesome/css/font-awesome.min.css'
import '../styles/apply.css'
import { toast } from "react-toastify";
import { FaCcVisa, FaCcAmex, FaCcMastercard, FaCcDiscover } from "react-icons/fa"

function Apply() {

  async function handleApplyWork(e) {
    e.preventDefault();

    try {

      const inputs = {
        f_name: e.target.f_name.value,
        f_email: e.target.f_email.value,
        f_work: e.target.f_work.value,
        f_time: e.target.f_time.value,
        f_sdate: e.target.f_sdate.value,
        f_edate: e.target.f_edate.value,
        f_description: e.target.f_description.value,
        f_price: e.target.f_price.value,
        f_cname: e.target.f_cname.value,
        f_card: e.target.f_card.value,
        f_expmonth: e.target.f_expmonth.value,
        f_expyear: e.target.f_expyear.value,
        f_cvv: e.target.f_cvv.value,
      }

      const data = await axiosFetch.post("/freelancer/applyWork", inputs);

      if (data.status !== 200) {
        throw new Error(data.statusText);
      }

      toast.success("Freelancer registered successfully!");
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <div>

      <div className="apply-container">
        <h1>Freelance Application</h1>
        <form
          onSubmit={handleApplyWork}
          encType="multipart/form-data"
          method="post"
          action=""
        >
          <label htmlFor="fname">
            <i className="fa fa-user"></i> Full Name
          </label>
          <input
            type="text"
            id="fname"
            name="f_name"
            placeholder="Please enter your full name..."
            required
          ></input>

          <label htmlFor="email">
            <i className="fa fa-envelope"></i> Email
          </label>
          <input
            type="text"
            id="email"
            name="f_email"
            placeholder="john@example.com"
            required
          ></input>



          <div className="semi-container">

            <div className="semi-container-child">
              <label htmlFor="work">
                <i className="fa fa-address-card-o"></i> Work Type
              </label>
              <select name="f_work" className="work">
                <option value="Graphic Design">Graphic Design</option>
                <option value="Proofreading and Writing">
                  Proofreading and Writing
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Programming">Programming</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="semi-container-child">
              <label htmlFor="price">
                <i className="fa fa-address-card-o"></i> Starting Price
              </label>
              <select name="f_price" className="price">
                <option value=" $5.00 - $20.00 "> $5.00 - $20.00 </option>
                <option value=" $21.00 - $40.00 "> $21.00 - $40.00 </option>
                <option value=" $41.00 - $80.00 "> $41.00 - $80.00 </option>
                <option value=" $81.00 - $100.00 "> $81.00 - $100.00 </option>
                <option value=" To Be Discussed "> To Be Discussed </option>
              </select>
            </div>

          <div className="semi-container-child">
            <label htmlFor="desc">
              <i className="fa fa-commenting-o"></i> Description
            </label>
            <textarea
              id="desc"
              name="f_description"
              className="desc"
              placeholder="Describe your work here..."
            ></textarea>
          </div>


          <div className="semi-container-child">
            <label htmlFor="time">
              <i className="far fa-clock"></i> Average Working Hours
            </label>
            <select name="f_time" className="work_t">
              <option value="Morning(6:00 A.M. - 12:00 P.M. PHT)">
                Morning(6:00 A.M. - 12:00 P.M. PHT)
              </option>
              <option value="Afternoon(12:00 P.M. - 6:00 P.M. PHT)">
                Afternoon(12:00 P.M. - 6:00 P.M. PHT)
              </option>
              <option value="Evening(6:00 P.M. - 12:00 A.M. PHT)">
                Evening(6:00 P.M. - 12:00 A.M. PHT)
              </option>
              <option value="Early Morning(1:00 A.M. - 6:00 A.M. PHT)">
                Early Morning(1:00 A.M. - 6:00 A.M. PHT)
              </option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="semi-container-child fake">
            <label htmlFor="days">
              <i className="fas fa-calendar-alt"></i> Working Days
            </label>

            <div className="row">
              <div className="col-50">
                <label htmlFor="day1">From</label>
                <select name="f_sdate" className="work_d1">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="col-50">
                <label htmlFor="day2">To</label>
                <select name="f_edate" className="work_d2">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>
            </div>

            <div className="semi-container-child">
              <div className="children-container">

                <div className="children-one">
                  <label htmlFor="days">
                    <i className="fas fa-calendar-alt"></i> Working Days
                  </label>
                  <div className="col-50">
                    <label htmlFor="day1">From</label>
                    <select name="work_start" className="work_d1">
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>

                <div className="children-two">
                  <div className="col-50">
                    <label htmlFor="day2">To</label>
                    <select name="work_end" className="work_d2">
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
           

          </div>
          <div className="col-50">
            <h2>Mode of Payment</h2>

            <label htmlFor="fname">Accepted Cards</label>
            <select name="f_card">
              <option value="visa">
                <FaCcVisa /> Visa
              </option>
              <option value="amex">
                <FaCcAmex /> Amex
              </option>
              <option value="mastercard">
                <FaCcMastercard /> Mastercard
              </option>
              <option value="discover">
                <FaCcDiscover /> Discover
              </option>
            </select>

            <label htmlFor="cname">Name on Card</label>
            <input
              type="text"
              id="cname"
              name="f_cname"
              placeholder="Please enter your card name..."
              required
            ></input>

            <label htmlFor="ccnum">Credit card number</label>
            <input
              type="text"
              id="ccnum"
              name="f_cardnumber"
              placeholder="1111-2222-3333-4444"
              required
            ></input>

            <div className="row">
              <div className="col-50">
                <label htmlFor="expmonth">Exp Month</label>
                <input
                  type="text"
                  id="expmonth"
                  name="f_expmonth"
                  placeholder="Please card expiry month..."
                  required
                ></input>

                <label htmlFor="expyear">Exp Year</label>
                <input
                  type="text"
                  id="f_expyear"
                  name="f_expyear"
                  placeholder="Expiry year here"
                  required
                ></input>
              </div>

              <div className="col-50">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="f_cvv"
                  placeholder="CVV here"
                  required
                ></input>
              </div>
            </div>
          </div>

          <button
            type="submit"
            name="apply"
            className="btn"
          >Post the Free-Lance Application</button>
        </form>

    </div>
    </div>
  );
}

export default Apply;