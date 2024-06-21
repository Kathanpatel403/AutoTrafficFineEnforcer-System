import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import InputControlPage from "./InputControlPage";
import { auth, firestore } from "../config/firebase";
import logo from '../assets/images/logo.png';
import logo1 from '../assets/images/hiking.png';
import './LoginPage.css'; // Import the CSS file for styling
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setErrorMsg("All fields are mandatory");
        return;
      }

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // If sign-in successful, navigate to the home page or any other desired route
      navigate("/");
    } catch (error) {
      setErrorMsg("Failed to sign in. Please check your credentials.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="glass-login">
          <div className="logo-container">
            <img src={logo} alt="logo image" className="logo" />
          </div>
          <div className="form-container">
            <h1 className="login-heading">Login</h1>

            <InputControlPage
              label="Email"
              onChange={handleEmailChange}
              placeholder="Enter email address"
              className="input-field"
            />

            <InputControlPage
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              className="input-field"
            />
            <button
              onClick={handleTogglePasswordVisibility}
              className="absolute right-10 t bottom-0 mt-auto mb-auto mr-3"
              style={{
                top:'100px'
              }}
            >
              <Icon icon={showPassword ? eye : eyeOff} size={15} />
            </button>

            <div className="error-message">
              <b className="text-red-500 block mb-2">{errorMsg}</b>
            </div>

            <button onClick={handleSignIn} className="login-button">
              Login
            </button>

            <div className="forgot-password">
              <Link to="/forgotpassword" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <p className="signup-text">
              Don't have an account?{" "}
              <span className="signup-link">
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="image-container">
          <img src={logo1} alt="Image Description" className="image" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
