import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { PostAttendance } from "../../services/Dashboard/apiDashboardView";

export const postAttendnance=useMutation({
    mutationFn:(data)=>PostAttendance,
    onSuccess:(data)=>console.log("Attendance Submitted Successfully"),
    onError:(error)=>console.log("Error Submitted Attendance",error)
})