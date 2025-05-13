import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  emailVerification,
  otpVerification,
  ChangePassword,
} from "../../services/LoginRegistration/apiLoginRegistration";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const Forgotpassword = () => {
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  // Validate email function
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // const startTimer = () => {
  //   setCanResend(false);
  //   setTimer(30);
  //   timerRef.current = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timerRef.current);
  //         setCanResend(true);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };

  const handleEmailVerified = async () => {
    if (!validateEmail()) return;
    setIsLoading(true);

    try {
      const status = await emailVerification(email);
      if (status === 200) {
        setShowOTP(true);
        // startTimer();
      } else {
        console.error("Email verification failed.");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  // const handleResendOtp = () => {
  //   console.log("Resending OTP...");
  //   startTimer();
  // };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const validatePassword = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };
  const handleSubmitOtp = async () => {
    const otpValue = otp.join("");
    console.log("OTP submitted:", otpValue);
    const status = await otpVerification(email, otpValue);
    if (status == 200) {
      setShowPasswordFields(true);
    }
  };
  const handlePasswordSubmit = async () => {
    if (validatePassword()) {
      try {
        const status = await ChangePassword(email, confirmPassword);
        if (status == 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="text-primary">Forgot Password</h1>
            <p className="text-muted">
              You are on the Way to Chaage Your System Password
            </p>
            <div className="mt-4">
              {!showOTP ? (
                <>
                  <input
                    type="email"
                    className={`form-control mb-3 ${
                      emailError ? "is-invalid" : ""
                    }`}
                    placeholder="Enter E-mail Address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {emailError}
                    </div>
                  )}
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleEmailVerified}
                    disabled={isLoading}
                  >
                    Send OTP
                  </button>
                </>
              ) : !showPasswordFields ? (
                <div>
                  <div className="d-flex justify-content-center mb-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="email"
                        className="form-control mx-1"
                        style={{ width: "40px", textAlign: "center" }}
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmitOtp}
                  >
                    Submit
                  </button>
                  <div className="mt-3">
                    {canResend ? (
                      <button
                        className="btn btn-link"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <>
                        <p>OTP will expire on 5 minutes</p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowOTP(false)}
                        >
                          Resend OTP{" "}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="position-relative mb-3">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className={`form-control mb-3 ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      placeholder="Create New Password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                    <span
                      className="position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  </div>
                  <div className="position-relative mb-3">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control mb-3 ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                    <span
                      className="position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  </div>
                  {passwordError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {passwordError}
                    </div>
                  )}
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePasswordSubmit}
                  >
                    Reset Password
                  </button>
                </div>
              )}
              <p className="mt-3">
                <a href="/" className="text-primary">
                  Back to Login
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 vh-100" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src="/images/crossForget1.png"
              alt="Forgot Password "
              className="img-fluid"
            />
          </div>
        </div>
      </div>
   {/* Fullscreen for Spinner  */}
   {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(110, 107, 107, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050, 
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{
              width: "4rem",
              height: "4rem",
              borderWidth: "0.4em",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Forgotpassword;
