
import { toast } from "react-toastify";
import { axiosFetch } from "../utils/axios"
import { useSearchParams } from "react-router-dom";
import "../styles/payment.css";

function Payment() {

  const [searchParams] = useSearchParams();

  async function handlePayment(e) {
    e.preventDefault();

    try {
      const work_id = searchParams.get("work_id");
      const data = await axiosFetch.post(`/employer/hire?work_id=${work_id}`);

      if (data.status !== 200) throw new Error(data.statusMessage);

      toast.success("Freelancer hired successfully");
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <main>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form onSubmit={handlePayment} action="" method="post">
              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                  <input type="text" id="fname" name="firstname" placeholder="Please enter your full name..." required />
                  <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                  <input type="text" id="email" name="email" placeholder="john@example.com" required />
                  <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                  <input type="text" id="adr" name="address" placeholder="Please enter your address..." required />
                  <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                  <input type="text" id="city" name="city" placeholder="Please enter your city..." required />

                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="state">Province</label>
                      <input type="text" id="state" name="state" placeholder="State name here" required />
                    </div>
                    <div className="col-50">
                      <label htmlFor="zip">Zip</label>
                      <input type="text" id="zip" name="zip" placeholder="City ZIP code here" required />
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                    <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                    <i className="fa fa-cc-mastercard" style={{ color: "red" }}></i>
                    <i className="fa fa-cc-discover" style={{ color: "orange" }}></i>
                  </div>
                  <label htmlFor="cname">Name on Card</label>
                  <input type="text" id="cname" name="cardname" placeholder="Please enter your card name..." required />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" required />
                  <label htmlFor="expmonth">Exp Month</label>
                  <input type="text" id="expmonth" name="expmonth" placeholder="Please card expiry month..." required />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="expyear">Exp Year</label>
                      <input type="text" id="expyear" name="expyear" placeholder="Expiry year here" required />
                    </div>
                    <div className="col-50">
                      <label htmlFor="cvv">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder="CVV here" required />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input type="checkbox" checked="checked" name="sameadr" /> Shipping address same as billing
              </label>
              <center><input type="submit" value="Pay Now!" className="btn" name="pay" /></center>
              {/* <?php 
          if($error > 0){
                              echo "<label>No Hired Free-lancer!</label>";
          }
        ?> */}
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            <h4>Cart <span className="price" style={{ color: "black" }}><i className="fa fa-shopping-cart"></i></span></h4>
            {/* <?php
        if(mysqli_num_rows($result) > 0){
          if($wid != ''){
          while($row = mysqli_fetch_assoc($result)){
            
              if($row['w_id'] == $wid){
                            echo "<p>".$name = $row['f_name']."'s Services"."</p>";
                          echo "<hr>
                            <p>Total <span className="." price"."><b>"."<p>".$price = $row['f_price']."</p>"."</b></span></p>";
              } 
            }
          } else{
                            echo "<p style=margin:100px 0px;>Cart is Empty!</p>";
          }
        }
      ?> */}
          </div>
        </div>
      </div >

    </main >
  )

}


export default Payment;