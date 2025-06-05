import React, { useEffect, useState } from "react";
import {
  postSource,
  getSource,
  deleteSource,
  updateSource,
} from "../../services/EnquiryBucket/apiSourceType";
import { useForm } from "react-hook-form";
import { HandleDeleteById } from "../../services/DeleteSwal/HandleDeleteById";
import "./CSS/enquiry.css";
import { fetchPageData } from "../../services/Pagination/Pagination";
import NumberedPagination from "../Pagination/NumberedPagination";

function SourceType() {
  const [sourceType, setSourceType] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { register, reset, handleSubmit } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 2,
    perPage: 10,
  });

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/source_type_handler/?page=${currentPage}`;
    fetchData(url);
  }, [currentPage]);

  const fetchData = async (url) => {
    const response = await fetchPageData(url);
    setProductData(response);
  };

  const fetchSourceType = async () => {
    try {
      const data = await getSource();
      setSourceType(data);
    } catch (error) {
      console.error("Error fetching source type data:", error);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      comm_type: data.comm_type,
      platform: data.platform,
      status: data.status,
    };

    if (editData) {
      const status = await updateSource(editData.id, payload);
      if (status === 200) {
        setEditData(null);
        setModalOpen(false);
        reset();
        fetchSourceType();
      }
    } else {
      const status = await postSource(payload);
      if (status === 201) {
        setModalOpen(false);
        fetchSourceType();
      }
    }
    reset();
  };

  const handleEdit = (data) => {
    console.log(data);

    setEditData(data);
    setModalOpen(true);
    reset({
      name: data.name,
      comm_type: data.comm_type,
      platform: data.platform || "",
      status: data.status.toString(),
    });
  };

  useEffect(() => {
    fetchSourceType();
  }, []);

  return (
    <div
      className="container-fluid flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="d-flex justify-content-between">
        <h5 className="breadcrumb mb-2 ml-2">
          <span className="text-muted fw-light">Enquiry Bucket /</span> Source
          Type
        </h5>

        <div className=" text-end">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
              reset({ name: "", comm_type: "", platform: "", status: "" });
            }}
          >
            <span>
              <i className="mdi mdi-plus me-0 me-sm-1"></i>
            </span>
            Source Type
          </button>
        </div>
      </div>

      <div className="col-sm ml-2">
        <div className="card">
          <div className="title card-header d-flex justify-content-between align-items-center bg-label-primary py-2">
            <h5 className="mb-0">Source Type:</h5>
          </div>
          <div className="text-nowrap p-3">
            <div className="table-responsive">
              <table className="table table-bordered" id="all_request_table">
                <thead className="table-secondary">
                  <tr>
                    <td>SL No</td>
                    <td>Source</td>
                    <td>Medium Type</td>
                    <td>Communication Type</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {sourceType?.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.platform}</td>
                      <td>{data.comm_type}</td>
                      <td>{data.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          className="btn btn-text-primary btn-sm small py-1 px-2 waves-effect waves-light"
                          title="Edit"
                          onClick={() => handleEdit(data)}
                        >
                          <i className="mdi mdi-pencil-outline"></i>
                        </button>
                        <button
                          onClick={() =>
                            HandleDeleteById(
                              data.id,
                              deleteSource,
                              fetchSourceType
                            )
                          }
                          className="btn btn-text-danger btn-sm small py-1 px-2 waves-effect waves-light"
                          title="Delete"
                        >
                          <i className="mdi mdi-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <NumberedPagination
                totalPages={2}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal show d-block" data-bs-backdrop="static">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h4 className="modal-title">
                  {editData ? "Edit Source Type" : "Add Source Type"}
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Source Name */}
                  <div className="col-md-12 mt-2 mb-2">
                    <label className="form-label">Source Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Source Name"
                      {...register("name")}
                      autoComplete="off"
                    />
                  </div>

                  {/* Source Platform Dropdown */}
                  <div className="col-md-12 mb-2">
                    <label className="form-label">Source Platform</label>
                    <select className="form-select" {...register("platform")}>
                      <option value="">Select Source Platform</option>
                      <option value="walk-in">Walk-in</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="social media">Social Media</option>
                      <option value="bulk data">Bulk Data</option>
                      <option value="web">Web</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="referal">Referral</option>
                      <option value="channel">Channel</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  {/* Type Of Communication */}

                  {/* Communication Mode Dropdown */}
                  <div className="col-md-12 mb-2">
                    <label className="form-label">Communication Mode</label>
                    <select className="form-select" {...register("comm_type")}>
                      <option value="" disabled selected>
                        Select Communication Mode
                      </option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  {/* Status Radio Buttons */}
                  <div className="row g-2 my-3">
                    <div className="col">
                      <label className="form-label mx-2">Status</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="true"
                          {...register("status")}
                        />
                        <label className="form-check-label">Active</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="false"
                          {...register("status")}
                        />
                        <label className="form-check-label">Inactive</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary waves-effect"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SourceType;
