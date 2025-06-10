import Swal from "sweetalert2";
export const HandleDeleteById = (id, deleteFunction, UpdateFunction,argumentForUpdatefunction) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await deleteFunction(id);
        if (res == 204 || res == 200) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
         if(argumentForUpdatefunction){
          UpdateFunction(argumentForUpdatefunction)
         }else{
          UpdateFunction();
         }
         
        } else {
          Swal.fire("Error", "Failed to delete item.", "error");
        }
      } catch (error) {
        console.log(error);
        
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  }); 
};
