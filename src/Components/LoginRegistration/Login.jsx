// // import React, { useState, useEffect } from "react";
// // import "./Login.css";
// // import Illustration from "./auth-v2-login-illustration-light.png";
// // import Mask from "./auth-v2-login-mask-light.png";
// // import { useNavigate } from "react-router-dom";
// // import crmStore from "../../Utils/crmStore";
// // import { addUserInfo } from "../../Utils/Slices/userInfoSlice";
// // import { apiLogin } from "../../services/LoginRegistration/apiLoginRegistration";
// // import { Spinner, Button } from "react-bootstrap";
// // import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// // import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// // import { useDispatch } from "react-redux";
// // import { persistor } from "../../Utils/crmStore";

// // const Login = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   useEffect(() => {
// //     handleLogout();
// //   }, []);

// //   const handleLogout = () => {
// //     dispatch({ type: "RESET_STORE" });
// //     persistor.purge();
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       setErrorMessage("Please enter both email and password");
// //       return;
// //     }
// //     setIsLoading(true);

// //     const prePairedData = {
// //       username: email,
// //       password: password,
// //     };
// //     const result = await apiLogin(prePairedData);
// //     if (result) {
// //       crmStore.dispatch(
// //         addUserInfo({
// //           userType: result?.user_type,
// //           refresh_token: result?.refresh,
// //           access_token: result?.access,
// //           employee_id: result?.employee_id,
// //           employee_name: result?.employee_name,
// //           employee_mobno: result?.employee_mobno,
// //           email: result?.email,
// //           department_id: result?.department_id,
// //           designation_id: result?.designation_id,
// //         })
// //       );

// //       console.log("Employee ID:", result?.employee_id);
// //       navigate("/dashboard");
// //     }
// //     setIsLoading(false);
// //     setErrorMessage("");
// //   };

// //   return (
// //     <div className="login-container">
// //       {/* Left Section */}
// //       <div className="left-section">
// //         <div className="mask-image">
// //           <img src={Mask} alt="Background Mask" />
// //         </div>
// //         <div className="illustration-image">
// //           <img src={Illustration} alt="Illustration" />
// //         </div>
// //       </div>

// //       <div className="right-section">
// //         <h1 className="welcome-heading">Welcome to Prop-Vichaar! 👋</h1>
// //         <p className="subheading">
// //           Please sign in to your account and start the adventure
// //         </p>

// //         <form onSubmit={handleSubmit} className="login-form">
// //           <input
// //             type="text"
// //             placeholder="Enter Email Address"
// //             className="input-field"
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <div style={{ position: "relative", width: "100%" }}>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               placeholder="Enter your password"
// //               className="input-field"
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               style={{
// //                 width: "100%",
// //                 paddingRight: "40px",
// //               }}
// //             />
// //             <span
// //               onClick={() => setShowPassword((prev) => !prev)}
// //               style={{
// //                 position: "absolute",
// //                 top: "35%",
// //                 right: "10px",
// //                 transform: "translateY(-50%)",
// //                 cursor: "pointer",
// //                 fontSize: "18px",
// //                 color: "#666",
// //                 userSelect: "none",
// //               }}
// //             >
// //               {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
// //             </span>
// //           </div>

// //           <div className="form-options">
// //             <label>
// //               <input type="checkbox" />
// //               <span> Remember Me</span>
// //             </label>
// //             <label
// //               className="forgot-password"
// //               onClick={() => {
// //                 navigate("/forgot-password");
// //               }}
// //             >
// //               Forgot Password?
// //             </label>
// //           </div>
// //           <Button
// //             type="submit"
// //             disabled={isLoading}
// //             style={{
// //               width: "100%",
// //               padding: "10px",
// //               position: "relative",
// //             }}
// //           >
// //             {isLoading ? (
// //               <>
// //                 <Spinner
// //                   as="span"
// //                   animation="border"
// //                   size="sm"
// //                   role="status"
// //                   aria-hidden="true"
// //                   style={{ marginRight: "8px" }}
// //                 />
// //                 Loading...
// //               </>
// //             ) : (
// //               "LOGIN"
// //             )}
// //           </Button>
// //         </form>

// //         {isLoading && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100vw",
// //               height: "100vh",
// //               backgroundColor: "rgba(110, 107, 107, 0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1000,
// //               opacity: 1,
// //               transition: "opacity 0.3s ease-in-out",
// //             }}
// //           >
// //             <Spinner
// //               animation="border"
// //               variant="primary"
// //               style={{
// //                 width: "4rem",
// //                 height: "4rem",
// //                 borderWidth: "0.4em",
// //               }}
// //             />
// //           </div>
// //         )}

// //         <style>
// //           {`
// //             @media (max-width: 768px) {
// //               div[style*="flex: 1 1 50%"]:first-child {
// //                 display: none;
// //               }
// //               div[style*="flex: 1 1 50%"]:nth-child(2) {
// //                 flex: 1 1 100%;
// //               }
// //             }
// //           `}
// //         </style>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;













// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import Illustration from "./auth-v2-login-illustration-light.png";
// import Mask from "./auth-v2-login-mask-light.png";
// import { useNavigate } from "react-router-dom";
// import crmStore from "../../Utils/crmStore";
// import { addUserInfo } from "../../Utils/Slices/userInfoSlice";
// import { Spinner, Button } from "react-bootstrap";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useDispatch } from "react-redux";
// import { persistor } from "../../Utils/crmStore";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("pradip@gmail.com");
//   const [password, setPassword] = useState("1234");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     handleLogout();
//   }, []);

//   const handleLogout = () => {
//     dispatch({ type: "RESET_STORE" });
//     persistor.purge();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage("Please enter both email and password");
//       return;
//     }
//     setIsLoading(true);

//     // Static credentials check
//     const staticUsername = "pradip@gmail.com";
//     const staticPassword = "1234";

//     if (email === staticUsername && password === staticPassword) {
//       // Mock user data
//       const mockUserData = {
//         // user_type: "admin", 
//         refresh: "mock-refresh-token",
//         access: "mock-access-token",
//         employee_id: "employee-123",
//         employee_name: "Pradip Sutar",
//         employee_mobno: "1234567890",
//         email: "pradip@gmail.com",
//         department_id: "IT",
//         designation_id: "Backend Developer",
//       };

//       crmStore.dispatch(
//         addUserInfo({
//           userType: mockUserData.user_type,
//           refresh_token: mockUserData.refresh,
//           access_token: mockUserData.access,
//           employee_id: mockUserData.employee_id,
//           employee_name: mockUserData.employee_name,
//           employee_mobno: mockUserData.employee_mobno,
//           email: mockUserData.email,
//           department_id: mockUserData.department_id,
//           designation_id: mockUserData.designation_id,
//         })
//       );

//       console.log("Employee ID:", mockUserData.employee_id);
//       navigate("/dashboard");
//     } else {
//       setErrorMessage("Invalid email or password");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="login-container">
//       {/* Left Section */}
//       <div className="left-section">
//         <div className="mask-image">
//           <img src={Mask} alt="Background Mask" />
//         </div>
//         <div className="illustration-image">
//           <img src={Illustration} alt="Illustration" />
//         </div>
//       </div>

//       <div className="right-section">
//         <h1 className="welcome-heading">Welcome to Prop-Vichaar! 👋</h1>
//         <p className="subheading">
//           Please sign in to your account and start the adventure
//         </p>

//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="login-form">
//           <input
//             type="text"
//             placeholder="Enter Email Address"
//             className="input-field"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <div style={{ position: "relative", width: "100%" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="input-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 width: "100%",
//                 paddingRight: "40px",
//               }}
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               style={{
//                 position: "absolute",
//                 top: "35%",
//                 right: "10px",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 fontSize: "18px",
//                 color: "#666",
//                 userSelect: "none",
//               }}
//             >
//               {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
//             </span>
//           </div>

//           <div className="form-options">
//             <label>
//               <input type="checkbox" />
//               <span> Remember Me</span>
//             </label>
//             <label
//               className="forgot-password"
//               onClick={() => {
//                 navigate("/forgot-password");
//               }}
//             >
//               Forgot Password?
//             </label>
//           </div>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             style={{
//               width: "100%",
//               padding: "10px",
//               position: "relative",
//             }}
//           >
//             {isLoading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                   style={{ marginRight: "8px" }}
//                 />
//                 Loading...
//               </>
//             ) : (
//               "LOGIN"
//             )}
//           </Button>
//         </form>

//         {isLoading && (
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               backgroundColor: "rgba(110, 107, 107, 0.5)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 1000,
//               opacity: 1,
//               transition: "opacity 0.3s ease-in-out",
//             }}
//           >
//             <Spinner
//               animation="border"
//               variant="primary"
//               style={{
//                 width: "4rem",
//                 height: "4rem",
//                 borderWidth: "0.4em",
//               }}
//             />
//           </div>
//         )}

//         <style>
//           {`
//             @media (max-width: 768px) {
//               div[style*="flex: 1 1 50%"]:first-child {
//                 display: none;
//               }
//               div[style*="flex: 1 1 50%"]:nth-child(2) {
//                 flex: 1 1 100%;
//               }
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState, useEffect } from "react";
import "./Login.css";
import Illustration from "./auth-v2-login-illustration-light.png";
import Mask from "./auth-v2-login-mask-light.png";
import { useNavigate } from "react-router-dom";
import crmStore from "../../Utils/crmStore";
import { addRoleAndRights } from "../../Utils/Slices/roleAndRightSlice";
import { addUserInfo } from "../../Utils/Slices/userInfoSlice";
import { apiLogin } from "../../services/LoginRegistration/apiLoginRegistration";
import { Spinner, Button } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { persistor } from "../../Utils/crmStore";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    dispatch({ type: "RESET_STORE" });
    persistor.purge();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const prePairedData = {
        username: email.trim(),
        password: password,
      };
      const result = await apiLogin(prePairedData);

      if (result) {
        
        crmStore.dispatch(
          addUserInfo({
            userType: result?.user_type,
            refresh_token: result?.refresh,
            access_token: result?.access,
            employee_id: result?.employee_id,
            employee_name: result?.employee_name,
            employee_mobno: result?.employee_mobno,
            email: result?.email,
            department_id: result?.department_id,
            designation_id: result?.designation_id,
          })
        );

        console.log("Employee ID:", result?.employee_id);
        console.log("Login Data:", result);
        navigate("/dashboard"); 
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="mask-image">
          <img src={Mask} alt="Background Mask" />
        </div>
        <div className="illustration-image">
          <img src={Illustration} alt="Illustration" />
        </div>
      </div>

      <div className="right-section">
        <h1 className="welcome-heading">Welcome to Prop-Vichaar! 👋</h1>
        <p className="subheading">
          Please sign in to your account and start the adventure
        </p>

        {errorMessage && (
          <p className="error-message" style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter Email Address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                paddingRight: "40px",
              }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                top: "35%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#666",
                userSelect: "none",
              }}
            >
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </span>
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" />
              <span> Remember Me</span>
            </label>
            <label
              className="forgot-password"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </label>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px",
              position: "relative",
            }}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "8px" }}
                />
                Loading...
              </>
            ) : (
              "LOGIN"
            )}
          </Button>
        </form>
      </div>

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
            zIndex: 1000,
            opacity: 1,
            transition: "opacity 0.3s ease-in-out",
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

      <style>
        {`
          @media (max-width: 768px) {
            div[style*="flex: 1 1 50%"]:first-child {
              display: none;
            }
            div[style*="flex: 1 1 50%"]:nth-child(2) {
              flex: 1 1 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
