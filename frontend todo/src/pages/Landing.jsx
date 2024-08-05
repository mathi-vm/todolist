import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Landing = () => {
  return (
    <>
      <div className="vh-100 ">
        <Navbar />

        <div
          className="d-flex container-fluid justify-content-center"
          style={{ marginTop: "10rem" }}
        >
          <div className="d-flex flex-column mt-5  ms-3 mb-5">
            <span className="display-6  fw-light text-white">
              Schedule your daily task with
              <span className="text-warning"> ToDay</span>
            </span>
            <div className="d-flex">
              <Link to="/register" className="btn btn-light mt-5 opacity-75">
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-light mt-5 ms-3 px-2 py-2 opacity-75"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
