import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from "../config/firebase";
import InputControlPage from "./InputControlPage";
import logo from '../assets/images/logo.png';
import background from "../assets/images/background.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import '../screens/LoginPage.css'
import logo1 from '../assets/images/backgroundforall.png'
function SignupPage() {
  const navigate = useNavigate();

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("All fields are mendetory");
      return;
    }
    setErrorMsg("");

    if (values.email && values.pass) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.pass);

        const uid = userCredential.user.uid;

        const userRoleRef = doc(collection(firestore, 'userRoles'), uid);
        setDoc(userRoleRef, {
          role: "user",
          email: values.email,
          name: values.name,
        }).then(() => {
          console.log("User role set successfully.");
          toast.success('Signup successful!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/userinfo")
        }).catch((error) => {
          console.error("Error setting user role:", error);
        })
      } catch (err) {
        alert(`got error: ${err.message}`);
        console.log("got error: ", err.message);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleNameChange = (event) => {
    setValues((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleEmailChange = (event) => {
    setValues((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setValues((prev) => ({ ...prev, pass: event.target.value }));
  };

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
  };


  return (
    <div className="flex flex-row items-center justify-center h-screen bg-cover bg-center bg-no-repeat min-h-screen"
     
    >
      <div className="">
        <div className="">
          <img src={logo} alt="logo image" className="w-[220px] h-[220px] ml-[120px] mt-[-100px]" />
        </div>
        <div className="p-8 bg-white rounded-lg shadow-xl w-[450px] mt-[-30px]">
          <h1 className="text-2xl font-bold mb-4 ml-[150px]">Signup</h1>

          <div className="mb-4">
            <label className="block mb-2 text-gray-800 text-xl">Name</label>
            <input
              type="text"
              value={values.name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 text-xl">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={handleEmailChange}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-800 text-xl">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={values.pass}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded-md pr-10"
            />
            <button
              onClick={handleToggle}
              className="absolute top-8 right-0 bottom-0 mt-auto mb-auto mr-3"
            >
              <Icon icon={icon} size={24} />
            </button>
          </div>

          <div className="mt-6">
            <b className="text-red-500 block mb-2">{errorMsg}</b>
            <button
              disabled={submitButtonDisabled}
              onClick={handleSubmission}
              className="text-white py-2 px-4 rounded-md overflow-hidden transform transition-all duration-300 ease-in-out bg-gray-600 hover:scale-105 hover:bg-gray-800 hover:shadow-md group"
            >
              Signup
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-50"></span>
            </button>
          </div>

          <p className="mt-4 text-m">
            Already have an account?{" "}
            <span className="text-gray-500 font-semibold">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;