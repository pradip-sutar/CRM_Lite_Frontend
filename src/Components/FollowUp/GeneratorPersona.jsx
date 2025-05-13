// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Grid, Typography, Box, Button } from "@mui/material";

// const GeneratorPersona = () => {
//   const { state: formData } = useLocation();
//   const navigate = useNavigate();

//   if (!formData) {
//     // If no form data is available, redirect to the form page
//     navigate("/behaviour");
//     return null;
//   }

//   const handleEdit = () => {
//     navigate("/behaviour", { state: formData });
//   };

//   return (
//     <div className="container-xxl flex-grow-1 container-p-y mb-5">
//       <div className="card-header d-flex justify-content-between align-items-center py-2">
//         <h5>
//           <span className="text-muted fw-light">Review / </span>Generated
//           Persona
//         </h5>
//       </div>
//       <div className="card">
//         <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
//           <h5 className="mb-0">Your Generated Persona:</h5>
//         </div>
//         <Box sx={{ padding: "20px" }}>
//           <Grid container spacing={3}>
//             <Grid item xs={9}>
//               <Typography variant="h5" gutterBottom color="#666cff">
//                 <strong>Buyer Persona Summary:</strong>
//               </Typography>

//               <Grid container spacing={2}>
//                 {/* Name and Role */}
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>Name:</strong> {formData.name}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>Role:</strong> {formData.role}
//                   </Typography>
//                 </Grid>

//                 {/* Description */}
//                 <Grid item xs={12}>
//                   <Typography variant="body1">
//                     <strong>Description:</strong> {formData.description}
//                   </Typography>
//                 </Grid>

//                 {/* Age, Sex, Income */}
//                 <Grid item xs={3}>
//                   <Typography variant="body1">
//                     <strong>Age:</strong> {formData.age}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography variant="body1">
//                     <strong>Sex:</strong> {formData.sex}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography variant="body1">
//                     <strong>Children:</strong> {formData.children}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography variant="body1">
//                     <strong>How Many:</strong> {formData.childrenCount}
//                   </Typography>
//                 </Grid>

//                 {/* Education and Income */}
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>Education:</strong> {formData.education}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>Income:</strong> ₹{formData.income}
//                   </Typography>
//                 </Grid>

//                 {/* City and State */}
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>City:</strong> {formData.city}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body1">
//                     <strong>State:</strong> {formData.state}
//                   </Typography>
//                 </Grid>

//                 {/* Fears, Wishes, Objections */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" color="#666cff" gutterBottom>
//                     <strong>Fears, Wishes, and Objections:</strong>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body1">
//                     <strong>Fears:</strong> {formData.fears}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body1">
//                     <strong>Wishes:</strong> {formData.wishes}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body1">
//                     <strong>Objections:</strong> {formData.objections}
//                   </Typography>
//                 </Grid>

//                 {/* Solutions */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" color="#666cff" gutterBottom>
//                     <strong>Your Solutions:</strong>
//                   </Typography>
//                   <Typography variant="body1">{formData.solutions}</Typography>
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Right Side (Importance, Behaviour, Keywords) */}
//             <Grid item xs={3}>
//               <Typography variant="h6" color="#666cff" gutterBottom>
//                 <strong>Importance:</strong>
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Family:</strong> {formData.family}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Friends:</strong> {formData.friends}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Work:</strong> {formData.work}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Leisure:</strong> {formData.leisure}
//               </Typography>

//               <Typography
//                 variant="h6"
//                 color="#666cff"
//                 gutterBottom
//                 sx={{ mt: 3 }}
//               >
//                 <strong>Behaviour:</strong>
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Extroversion:</strong> {formData.extroversion}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Impulsiveness:</strong> {formData.impulsiveness}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Emotion:</strong> {formData.emotion}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Friendliness:</strong> {formData.friendness}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Creativity:</strong> {formData.creativity}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Objectivity:</strong> {formData.objectivity}
//               </Typography>

//               <Typography
//                 variant="h6"
//                 color="#666cff"
//                 gutterBottom
//                 sx={{ mt: 3 }}
//               >
//                 <strong>Keywords:</strong>
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Organization:</strong> {formData.organization}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Dedication:</strong> {formData.dedication}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Workaholic:</strong> {formData.workaholic}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Lack of Time:</strong> {formData.lackOfTime}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Yoga:</strong> {formData.yoga}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Box mt={4} display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleEdit}
//               sx={{
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Edit Persona
//             </Button>
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default GeneratorPersona;

import React from "react";
import {
  Grid,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BehaviorRadarChart from "./BehaviorRadarChart";

const GeneratorPersona = () => {
  const { state: formData } = useLocation();
  const navigate = useNavigate();

  if (!formData) {
    // If no form data is available, redirect to the form page
    navigate("/behaviour");
    return null;
  }

  const handleEdit = () => {
    navigate("/behaviour", { state: formData });
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y mb-5">
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5>
          <span className="text-muted fw-light">FollowUp / </span>Generator
          Persona
        </h5>
        <div className="mb-2 text-end">
          <Link
            to="javascript: history.go(-1)"
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Back to list"
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
          <h5 className="mb-0">Generator Persona:</h5>
        </div>
        <Box sx={{ padding: 2, maxHeight: "74vh", overflow: "auto" }}>
          <Grid container spacing={2}>
            {/* Left Side */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h4">Name: {formData.name}</Typography>
                <Typography variant="subtitle1">
                  Role: {formData.role}
                </Typography>
                <Typography variant="subtitle2">
                  Business Head for IYRO ERP
                </Typography>

                {/* Demographics */}
                <Box mt={2}>
                  <Box sx={{ mb: -1 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5" gutterBottom color={"#666cff"}>
                      <strong> Demographic</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ mt: -2 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography>
                        <strong> Age:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.age}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>Sex:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.sex}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>City:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.city}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>State:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.state}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>Income:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.income}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>Education:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.education}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>Children:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.children}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <strong>How Many:</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{formData.childrenCount}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Importance */}
                <Box mt={2}>
                  <Box sx={{ mb: -1 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5" gutterBottom color={"#666cff"}>
                      <strong> Importance</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ mt: -2 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  <Box mb={1}>
                    <Typography>Family</Typography>
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: 20,
                        borderRadius: "8px",
                        border: "2px solid #00376e",
                      }}
                      value={
                        formData.family.includes("%")
                          ? parseFloat(formData.family)
                          : parseFloat(formData.family) * 100
                      }
                    />
                  </Box>
                  <Box mb={1}>
                    <Typography>Friends</Typography>
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: 20,
                        borderRadius: "8px",
                        border: "2px solid #00376e",
                      }}
                      value={
                        formData.friends.includes("%")
                          ? parseFloat(formData.friends)
                          : parseFloat(formData.friends) * 100
                      }
                    />
                  </Box>
                  <Box mb={1}>
                    <Typography>Work</Typography>
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: 20,
                        borderRadius: "8px",
                        border: "2px solid #00376e",
                      }}
                      value={
                        formData.work.includes("%")
                          ? parseFloat(formData.work)
                          : parseFloat(formData.work) * 100
                      }
                    />
                  </Box>
                  <Box mb={1}>
                    <Typography>Leisure</Typography>
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: 20,
                        borderRadius: "8px",
                        border: "2px solid #00376e",
                      }}
                      value={
                        formData.leisure.includes("%")
                          ? parseFloat(formData.leisure)
                          : parseFloat(formData.leisure) * 100
                      }
                    />
                  </Box>
                </Box>

                {/* Behavior - Radar Chart (For Example only, you'll need a chart library like Chart.js) */}
                <Box mt={2}>
                  <Box sx={{ mb: -1 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5" gutterBottom color={"#666cff"}>
                      <strong> Behaviour</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ mt: -2 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                  {/* Insert Radar chart here */}
                  <BehaviorRadarChart data={formData} />
                </Box>
              </Paper>
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={6}>
              <Avatar
                src="/images/avatars/6.png"
                alt="Profile Image"
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: "#f0f0f0", // to match the background of the avatar
                }}
              />
              <Paper elevation={2} sx={{ padding: 2 }}>
                <Box display="flex" justifyContent="start">
                  <Typography variant="h6" gutterBottom color={"#7c7c7c"}>
                    <strong>Main Fears</strong>
                  </Typography>
                </Box>
                <Box sx={{ mt: -2, mb: 2 }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgb(162 162 162 / 29%)",
                      // color: "rgb(162 162 162 / 29%)",
                    }}
                  />
                </Box>
                <Typography sx={{ mb: 9 }}>
                  {/* Fearing of paying more expense in installation of solar
                  product */}
                  {formData.fears}
                </Typography>

                <Box display="flex" justifyContent="start">
                  <Box display="flex" justifyContent="start">
                    <Typography variant="h6" gutterBottom color={"#7c7c7c"}>
                      <strong>Main Wishes</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: -2 }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgb(162 162 162 / 29%)",
                      // color: "rgb(162 162 162 / 29%)",
                    }}
                  />
                </Box>
                <Typography sx={{ mb: 9 }}>
                  {/* The price should be a little lower */}
                  {formData.wishes}
                </Typography>

                <Box display="flex" justifyContent="start">
                  <Box display="flex" justifyContent="start">
                    <Typography variant="h6" gutterBottom color={"#7c7c7c"}>
                      <strong>Main Objections</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: -2 }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgb(162 162 162 / 29%)",
                      // color: "rgb(162 162 162 / 29%)",
                    }}
                  />
                </Box>
                <Typography sx={{ mb: 9 }}>
                  {/* Whether it will be value for money */}
                  {formData.objections}
                </Typography>

                <Box display="flex" justifyContent="start">
                  <Box display="flex" justifyContent="start">
                    <Typography variant="h6" gutterBottom color={"#7c7c7c"}>
                      <strong>How Do we Help ?</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: -2 }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgb(162 162 162 / 29%)",
                      // color: "rgb(162 162 162 / 29%)",
                    }}
                  />
                </Box>
                <Typography sx={{ mb: 9 }}> {formData.solutions}</Typography>

                <Box display="flex" justifyContent="start">
                  <Box display="flex" justifyContent="start">
                    <Typography variant="h6" gutterBottom color={"#7c7c7c"}>
                      <strong>Key-Words</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ mt: -2, mb: 2 }}>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgb(162 162 162 / 29%)",
                        // color: "rgb(162 162 162 / 29%)",
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: -2 }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgb(162 162 162 / 29%)",
                      // color: "rgb(162 162 162 / 29%)",
                    }}
                  />
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord1}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord2}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord3}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord4}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord5}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord6}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord7}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>✓ {formData.keyWord8}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default GeneratorPersona;
