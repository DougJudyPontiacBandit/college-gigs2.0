import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import Join from "./pages/Join";
import JoinEmployer from "./pages/join_subpages/SignupEmployer";
import JoinFreelancer from "./pages/join_subpages/SignupFreelancer";

import ProfileEmployer from "./pages/profile_subpages/ProfileEmployer";
import ProfileFreelancer from "./pages/profile_subpages/ProfileFreelancer";

import UpdateProfileEmployer from "./pages/update_profile_subpages/UpdateProfileEmployer";
import UpdateProfileFreelancer from "./pages/update_profile_subpages/UpdateProfileFreelancer";

import Login from "./pages/Login";
import LoginEmployer from "./pages/login_subpages/LoginEmployer";
import LoginFreelancer from "./pages/login_subpages/LoginFreelancer";

import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Design from "./pages/work_subpages/Design";
import Marketing from "./pages/work_subpages/Marketing";
import Programming from "./pages/work_subpages/Programming";
import Writing from "./pages/work_subpages/Writing";

import Payment from "./pages/Payment";

import Apply from "./pages/Apply";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="login">
            <Route index element={<Login />} />
            <Route
              exact
              path="employer"
              element={
                <LoginEmployer
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              exact
              path="freelancer"
              element={
                <LoginFreelancer
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Route>
          <Route exact path="join">
            <Route index element={<Join />} />
            <Route exact path="employer" element={<JoinEmployer />} />
            <Route exact path="freelancer" element={<JoinFreelancer />} />
          </Route>

          <Route exact path="user">
            <Route exact path="profile">
              <Route exact path="employer" element={<ProfileEmployer />} />
              <Route exact path="freelancer" element={<ProfileFreelancer />} />
            </Route>

            <Route
              exact
              path="update"
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route
                exact
                path="freelancer"
                element={<UpdateProfileFreelancer />}
              />
              <Route
                exact
                path="employer"
                element={<UpdateProfileEmployer />}
              />
            </Route>
          </Route>

          <Route exact path="jobs" element={<Outlet />}>
            <Route exact path="marketing" element={<Marketing />} />
            <Route exact path="design" element={<Design />} />
            <Route exact path="programming" element={<Programming />} />
            <Route exact path="writing" element={<Writing />} />
          </Route>

          <Route exact path="/freelancer/apply" element={<Apply />} />

          <Route exact path="/services" element={<Services />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
