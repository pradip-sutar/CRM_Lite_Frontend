import React, { useState } from "react";

const Profile = () => {
  // Initialize state with one empty field
  const [fields, setFields] = useState([{}]);

  // Handle adding new fields
  const handleAddField = () => {
    setFields([...fields, {}]); // Add a new empty object to the array
  };

  // Handle deleting a field
  const handleDeleteExperiences = index => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
     <div className="container-xxl flex-grow-1 container-p-y" style={{'minHeight':'84%'}}>
      <h5>
        <span className="text-muted fw-light">
          Employee Management / KYC /{" "}
        </span>{" "}
        Profile
      </h5>
      <div className="card">
        <div className="card-header">Customer Information</div>
        <div className="card-body">
          <form>
            {fields.map((_, index) => (
              <div key={index} className="row">
                <div className="col-md-4 mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Father</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter father's name"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Date Of Birth</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter date of birth"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter department"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Level</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter level"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter designation"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Date Of Join</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter date of join"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Date Of Release</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter date of release"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Salary</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter salary"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label>Document Upload Agent</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter document upload agent"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Permanent Address Proof</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>PAN Card</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Bank Account Proof</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Correspondence Address Proof</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Latest Photograph</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-md-12 mb-3">
                  <label>KYC Status Update</label>
                  <div>
                    <input
                      type="radio"
                      id={`kycOn${index}`}
                      name={`kycStatus${index}`}
                      value="ON"
                      className="me-1"
                    />
                    <label htmlFor={`kycOn${index}`} className="me-4">
                      <strong>ON</strong>
                    </label>
                    <input
                      type="radio"
                      id={`kycOff${index}`}
                      name={`kycStatus${index}`}
                      value="OFF"
                      className="me-1"
                    />
                    <label htmlFor={`kycOff${index}`}>
                      <strong>OFF</strong>
                    </label>

                    <div className="mt-3 mb-3 col-lg-12 col-xl-2 col-12 d-flex  align-items-center mb-0">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteExperiences(index)}
                      >
                        <i className="mdi mdi-close me-1"></i>
                        <span className="align-middle">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-4 col-lg-3 col-12 mb-0 d-flex justify-content-start align-items-center">
              <button
                type="button"
                className="btn btn-primary me-4"
                onClick={handleAddField}
              >
                <i className="mdi mdi-plus me-1"></i>
                <span className="align-middle">Add</span>
              </button>

              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
