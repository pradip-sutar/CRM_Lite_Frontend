import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fetchPageData } from "../../services/Pagination/Pagination";
import NumberedPagination from "../Pagination/NumberedPagination";
import { AssignDead } from "../../services/DeadTable/apiAsignDeadData";

function DeadTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [deadData, setDeadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    perPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/dead_table_handler/?page=${currentPage}`;
    loadData(url);
  }, [currentPage]);

  const loadData = async (url) => {
    setLoading(true);
    const result = await fetchPageData(url);
    console.log("result", result);

    setDeadData(result);
    setPaginationInfo({
      total: result.total || 0,
      perPage: result.perPage || 10,
    });
    setLoading(false);
  };

  const openModal = (event) => {
    event.preventDefault();
    if (selectedRows.length > 0) {
      handleSubmit();
    } else {
      toast.error("Please select at least one Dead Data.");
    }
  };

  const handleCheckboxChange = (event, enquiry_id) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, Number(enquiry_id)]);
    } else {
      setSelectedRows((prev) => prev.filter((i) => i !== Number(enquiry_id)));
    }
  };

  const handleSubmit = async () => {
    console.log(selectedRows);
    try {
      const status = await AssignDead(selectedRows);
      if (status == 200) {
        const url = `${
          import.meta.env.VITE_URL_BASE
        }/api/dead_table_handler/?page=${currentPage}`;
        loadData(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center py-2">
        <h5 className="breadcrumb mb-2 ml-2">
          <span className="text-muted fw-light">Enquiry Bucket /</span> Dead
          Table
        </h5>
      </div>
      <div className=" col-sm ml-2">
        <div className="card">
          <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Dead Table :</h5>
            {/* <!--  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTop">
            <span><i className="mdi mdi-plus me-0 me-sm-1"></i></span> Department
          </button> --> */}
          </div>
          <form onSubmit={openModal}>
            <div className="text-nowrap p-3">
              <div className="table-responsive">
                <table className="table table-bordered" id="all_request_table">
                  <thead className="table-secondary">
                    <tr>
                      <td>SL No</td>
                      <td>Enquiry ID</td>
                      <td>Customer Name</td>
                      <td>Date</td>
                      <td>Stage</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {deadData?.data?.map((row, index) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(
                              Number(row.enquiry_id)
                            )}
                            onChange={(event) =>
                              handleCheckboxChange(event, row.enquiry_id)
                            }
                          />{" "}
                          {(currentPage - 1) * paginationInfo.perPage +
                            index +
                            1}
                        </td>
                        <td>{row.enquiry_id}</td>
                        <td>{row.customer_name}</td>
                        <td>{row.date}</td>
                        <td>{row.stage}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Box display="flex" justifyContent="end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mb: 4, mr: 4, mt: 4 }}
                >
                  Submit
                </Button>
              </Box>
            </div>
          </form>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted"></div>
            <NumberedPagination
              totalPages={deadData?.total_pages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeadTable;
