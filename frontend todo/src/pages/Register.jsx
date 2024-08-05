// import React from 'react'

// const register = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default register
// import React, { useState } from "react";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="container " style={{marginTop:"8.5rem"}}>
//       <div className=" d-flex justify-content-center ">
//         <div className="col-md-6">
//           <div className="card bg-light shadow">
//             <div className="card-header bg-light shadow">
//               <h3 className="text-center">Register</h3>
//             </div>
//             <div className="card-body shadow">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center">
//                 <button type="submit" className="btn btn-primary btn-block mt-3 ">
//                   Register
//                 </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
import { useState } from "react";
import React from "react";
import {  useNavigate } from "react-router-dom";
import PasswordInput from "../input/PasswordInput";
import { ValidateEmail } from "../Controller/Helper";
//import axiosInstance from "../../Components/Controller/axiosInstance";
import '../index'
import axiosInstance from "../Controller/axiosInstance";
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    //signup function
    const handleSignUp = async (e) => {
      e.preventDefault();
  
      if (!name) {
        setError("please enter your name");
        return;
      }
      if (!ValidateEmail(email)) {
        setError("please enter a valid email address.");
        return;
      }
      if (!password) {
        setError("please enter the password");
        return;
      }
  
      setError("");
  // fetch api for signup
      try {
        const response = await axiosInstance.post("/api/users/register", {
          name,
          email,
          password,
        });
  
        if (response.data) {
          navigate("/login"); 
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
   };
  
    return (
      <div className="container-fixed  d-flex flex-coloumn  vh-100 justify-content-center  align-items-center ">
        <div className="shadow-lg p-5 mb-5  rounded ">
          <form onSubmit={handleSignUp}>
            <h4 className="fw-bold text-white mt-2">Register</h4>
  
            <div className="border bg-white   mb-3 mt-5 h3 me-2 border-success w-100">
              <input
                type="text"
                placeholder="Name"
                className="  mt-1 pt-1 w-100 h-25   ps-1   mb-1 fs-6  bg-white  border-0"
                style={{ outline: "none" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
  
            <div className="border bg-white  w-100 mt-2 mb-3 h3 me-2 border-success w-100">
              <input
                type="text"
                placeholder="Email"
                className="  mt-1 pt-1 w-100 h-25  ps-1  mb-1  fs-6   border-0"
                style={{ outline: "none" }}
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
  
            <div className=" border   mb-3 bg-white h3 me-2 border-success w-100">
              <PasswordInput
                value={password}
                onChange={(e) => setUserPassword(e.target.value)}
              />{" "}
            </div>
            {error && <p className="text-warning text-bold fs-6 pb-1">{error}</p>}
  
            <button
              type="submit"
              style={{border:"none"}}
              className="bg-primary opacity-100 shadow fs-5 text-white fst-italic w-100 rounded mt-4"
            >
              Create Account
            </button>
            <br />
  
          </form>
        </div>
      </div>
    );
  };
  
  export default Signup;
  