import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  PostCallStatus,
  getCallStatus,
  editCallStatus,
  deleteCallStatus,
} from "../../services/FollowUp/callStatus";
import toast from "react-hot-toast";

export const useAddCallStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: addCallStatus } = useMutation({
    mutationFn: (data) => PostCallStatus(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["callStatuses"],
      });
      toast.success("Call Status Created Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isPending, addCallStatus };
};

export const useGetCallStatus = () => {
  const {
    error,
    isLoading,
    data: callStatusData,
  } = useQuery({
    queryKey: ["callStatuses"],
    queryFn: getCallStatus,
  });
  return { callStatusData, isLoading, error };
};

export const useEditCallStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: editCallStatusreport } = useMutation({
    mutationFn: (data) => editCallStatus(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["callStatuses"],
      });
      toast.success("Call Status Updated Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return { editCallStatusreport, isPending };
};

// export const useDeleteCallStatus = async () => {
//   const queryClient = useQueryClient();
//   const { isPending, mutateAsync: deleteCallStatusReport } = useMutation({
//     mutationFn: (id) => deleteCallStatus(id),
//     onSuccess: (data) => {
//       console.log(data);
//       queryClient.invalidateQueries({
//         queryKey: ["callStatuses"],
//       });
//     },
//     onError: (error) => {
//       console.log(error);
//       toast.error(error.message);
//     },
//   });
//   return {deleteCallStatusReport,isPending}
// };

export const useDeleteCallStatus = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteCallStatusReport } = useMutation({
    mutationFn: (id) => deleteCallStatus(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["callStatuses"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to delete call status.");
    },
  });

  return { deleteCallStatusReport, isPending };
};
