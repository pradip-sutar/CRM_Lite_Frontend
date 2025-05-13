import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSchedule } from "../../services/FollowUp/AccountProfileview/accountProfileview";
// Custom StepIcon as a smaller blue circle with shadow
const BlueStepIcon = styled("div")(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: "#666cff",
  boxShadow: `0 0 8px ${theme.palette.primary.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "7px",
}));

// Custom StepConnector with blue lines
const BlueConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${StepConnector.line}`]: {
    borderColor: theme.palette.primary.main,
  },
}));

// Custom StepLabel to adjust positioning
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-iconContainer": {
    marginRight: "8px",
  },
}));

const ActivityLog = ({ enquiry_id }) => {
  const [scheduledActivity, setScheduleActivity] = useState([]);
  const fetchActivies = async (enquiry_id) => {
    const data = await getSchedule(enquiry_id);
    // console.log(data);
    setScheduleActivity(data);
  };
  useEffect(() => {
    fetchActivies(enquiry_id);
  }, [enquiry_id]);

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <Grid item xs={8}>
      <Box
        sx={{
          mt: {
            xs: -7,
            sm: -7,
            md: -7,
            lg: -7,
            xl: -7,
          },
          maxHeight: "500px",
          overflowY: "auto",
          
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">Activity</Typography>
            <Stepper orientation="vertical" connector={<BlueConnector />}>
              {scheduledActivity?.length > 0 &&
                scheduledActivity
                  ?.slice() // Create a shallow copy of the array to avoid mutating the original array
                  .reverse() // Reverse the array
                  .map((activity, index) => (
                    <Step key={index} active={true}>
                      <CustomStepLabel StepIconComponent={BlueStepIcon}>
                        {activity.next_discussion_point}
                      </CustomStepLabel>
                      <StepContent>
                        <Typography variant="body2" color="textSecondary">
                          {activity.action}
                        </Typography>
                      </StepContent>
                      <StepContent>
                        <Typography variant="body2" color="textSecondary">
                          {activity?.next_date_time &&
                            (isNaN(new Date(activity.next_date_time).getTime())
                              ? activity?.next_date_time
                              :  new Date(activity?.next_date_time + "Z").toLocaleString(
                                "en-IN",
                                options
                              ) || "")}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
            </Stepper>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default ActivityLog;
