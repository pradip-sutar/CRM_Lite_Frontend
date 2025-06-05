import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/Product/apiProductForm";
import { fetchPageData } from "../../services/Pagination/Pagination";
import NumberedPagination from "../Pagination/NumberedPagination";

function Product() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 2,
    perPage: 10,
  });

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_BASE
    }/api/project_new_handler/?page=${currentPage}`;
    fetchData(url);
  }, [currentPage]);

  const fetchData = async (url) => {
    const response = await fetchPageData(url);
    setProductData(response);
  };

  const deleteProductfn = async (id) => {
    const status = await deleteProduct(id);
    if (status == 204) {
      const url = `${
        import.meta.env.VITE_URL_BASE
      }/api/project_new_handler/?page=${currentPage}`;
      fetchData(url);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap ml-2">
            System Admin /
          </span>{" "}
          Product
        </h5>

        <div className="mb-2 text-end">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            onClick={() => navigate("/product/product-form")}
          >
            <span className="mdi mdi-plus"></span>Add Product
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 ps-lg-4">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-label-primary py-2">
              <h5 className="mb-0">Product List :</h5>
            </div>

            <div className="card-body pt-3">
              <div className="table-responsive text-nowrap">
                <div
                  id="product_table_wrapper"
                  className="dataTables_wrapper dt-bootstrap5 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12">
                      {productData?.data?.length > 0 ? (
                        <table
                          className="table table-bordered dataTable no-footer"
                          id="product_table"
                          aria-describedby="product_table_info"
                        >
                          <thead className="table-secondary">
                            <tr>
                              <th style={{ width: "45px" }}>SL No.</th>
                              <th style={{ width: "150px" }}>Name</th>
                              <th style={{ width: "300px" }}>Description</th>
                              <th style={{ width: "100px" }}>Rate</th>
                              <th style={{ width: "100px" }}>GST (%)</th>
                              <th style={{ width: "100px" }}>Cost</th>
                              <th style={{ width: "100px" }}>Image</th>
                              <th style={{ width: "100px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productData?.data?.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * paginationInfo.perPage +
                                    index +
                                    1}
                                </td>
                                <td>{row.project_name}</td>
                                <td>{row.project_description}</td>
                                <td>{row.rate}</td>
                                <td>{row.gst}</td>
                                <td>{row.cost}</td>
                                <td>
                                  <img
                                    src={`${import.meta.env.VITE_URL_BASE}${
                                      row.image
                                    }`}
                                    alt="Product"
                                    style={{ width: 80, height: 40 }}
                                  />
                                </td>
                                <td>
                                  <div
                                    onClick={() =>
                                      navigate("/product/product-form", {
                                        state: { data: row },
                                      })
                                    }
                                    className="btn btn-text-dark btn-sm small py-1 px-2 waves-effect waves-light"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="Edit"
                                  >
                                    <i className="mdi mdi-pencil-outline"></i>
                                  </div>

                                  <div
                                    onClick={() =>
                                      deleteProductfn(row.project_id)
                                    }
                                    className="btn btn-text-danger btn-sm small py-1 px-2"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-original-title="Delete"
                                  >
                                    <i className="mdi mdi-trash-can" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <h3>No Products Found</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing{" "}
                  {Math.min(paginationInfo?.perPage, productData?.length)} of{" "}
                  {paginationInfo.total} entries
                </div>
                <NumberedPagination
                  totalPages={2}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
