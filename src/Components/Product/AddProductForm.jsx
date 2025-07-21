import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  postProductForm,
  editProduct,
} from "../../services/Product/apiProductForm";

function AddProductForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      ProductInfo: [
        {
          project_name: "",
          project_description: "",
          rate: "",
          gst: "",
          cost: "",
          image: null,
        },
      ],
    },
  });

  const {
    fields: productInfoArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ProductInfo",
  });

  const location = useLocation();
  const editData = location?.state?.data || null;

async function onSubmit(data) {
  console.log("hii", data);
  const formData = new FormData();

  data?.ProductInfo?.forEach((productDetail, index) => {
    for (const [key, value] of Object.entries(productDetail)) {
      // Only append image if it's a valid File
      if (key === "image") {
        const imageFile = value?.[0];
        if (imageFile instanceof File) {
          formData.append(`${key}[${index}]`, imageFile);
        }
      } else {
        formData.append(`${key}[${index}]`, value);
      }
    }
  });

  if (editData) {
    const cleanedData = {};
    for (let [key, value] of formData.entries()) {
      const cleanedKey = key.replace(/\[\d+\]$/, "");
      cleanedData[cleanedKey] = value;
    }

    if (cleanedData.image instanceof File) {
      delete cleanedData.image; 
    }

    const res = await editProduct(
      cleanedData,
      data?.ProductInfo?.[0]?.project_id
    );
    if (res === 200) {
      reset();
      navigate(-1);
    }
  } else {
    const res = await postProductForm(formData);
    if (res === 201) {
      reset();
      navigate(-1);
    }
  }
}


  useEffect(() => {
    if (editData) {
      const productData = editData;
      Object.entries(productData).forEach(([key, value]) => {
        if (key !== "id" && key !== "createdAt" && key !== "updatedAt") {
          setValue(`ProductInfo.0.${key}`, value);
        }
      });
    }
  }, [editData, setValue]);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{ minHeight: "84%" }}
    >
      <div className="d-flex justify-content-between align-items-center ml-2">
        <h5 className="text-nowrap p-md-0">
          <span className="text-muted fw-light ms-0 ms-md-4 text-nowrap">
            Product /
          </span>
          Product Form
        </h5>
        <div className="mb-2 text-end">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Back to list"
            onClick={() => navigate(-1)}
          >
            <span className="mdi mdi-keyboard-backspace"></span>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 ps-lg-4">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-label-primary py-2">
              <h5 className="mb-0">Product Info :</h5>
            </div>
            <div className="card-body">
              <form className="form-repeater" onSubmit={handleSubmit(onSubmit)}>
                {productInfoArray.map((field, index) => (
                  <div key={field.id} className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${
                            errors?.ProductInfo?.[index]?.project_name
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id={`name_${index}`}
                          {...register(`ProductInfo.${index}.project_name`, {
                            required: "Product Name is required",
                            onBlur: () =>
                              clearErrors(`ProductInfo.${index}.project_name`),
                          })}
                          placeholder="Product Name"
                        />
                        <label htmlFor={`name_${index}`}>
                          Product Name <span className="text-danger">*</span>
                        </label>
                        {errors?.ProductInfo?.[index]?.project_name && (
                          <small className="text-danger">
                            {errors.ProductInfo[index].project_name.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.project ? "is-invalid" : ""
                          }`}
                          placeholder="Product Type"
                          {...register("project")}
                        />
                        <label htmlFor="productType">
                          Product Type<span className="text-danger">*</span>{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${
                            errors?.ProductInfo?.[index]?.project_description
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id={`description_${index}`}
                          {...register(
                            `ProductInfo.${index}.project_description`,
                            {
                              required: "Description is required",
                              onBlur: () =>
                                clearErrors(
                                  `ProductInfo.${index}.project_description`
                                ),
                            }
                          )}
                          placeholder="Description"
                        />
                        <label htmlFor={`description_${index}`}>
                          Description <span className="text-danger">*</span>
                        </label>
                        {errors?.ProductInfo?.[index]?.project_description && (
                          <small className="text-danger">
                            {
                              errors.ProductInfo[index].project_description
                                .message
                            }
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${
                            errors?.ProductInfo?.[index]?.rate
                              ? "is-invalid"
                              : ""
                          }`}
                          type="number"
                          id={`rate_${index}`}
                          {...register(`ProductInfo.${index}.rate`, {
                            required: "Rate is required",
                            min: {
                              value: 0,
                              message: "Rate must be a positive number",
                            },
                            onBlur: () =>
                              clearErrors(`ProductInfo.${index}.rate`),
                          })}
                          placeholder="Rate"
                        />
                        <label htmlFor={`rate_${index}`}>
                          Rate <span className="text-danger">*</span>
                        </label>
                        {errors?.ProductInfo?.[index]?.rate && (
                          <small className="text-danger">
                            {errors.ProductInfo[index].rate.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${
                            errors?.ProductInfo?.[index]?.gst
                              ? "is-invalid"
                              : ""
                          }`}
                          type="number"
                          id={`gst_${index}`}
                          {...register(`ProductInfo.${index}.gst`, {
                            required: "GST is required",
                            min: {
                              value: 0,
                              message: "GST must be a positive number",
                            },
                            onBlur: () =>
                              clearErrors(`ProductInfo.${index}.gst`),
                          })}
                          placeholder="GST (%)"
                        />
                        <label htmlFor={`gst_${index}`}>
                          GST (%) <span className="text-danger">*</span>
                        </label>
                        {errors?.ProductInfo?.[index]?.gst && (
                          <small className="text-danger">
                            {errors.ProductInfo[index].gst.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          className={`form-control controlFoorm ${
                            errors?.ProductInfo?.[index]?.cost
                              ? "is-invalid"
                              : ""
                          }`}
                          type="number"
                          id={`cost_${index}`}
                          {...register(`ProductInfo.${index}.cost`, {
                            required: "Cost is required",
                            min: {
                              value: 0,
                              message: "Cost must be a positive number",
                            },
                            onBlur: () =>
                              clearErrors(`ProductInfo.${index}.cost`),
                          })}
                          placeholder="Cost"
                        />
                        <label htmlFor={`cost_${index}`}>
                          Cost <span className="text-danger">*</span>
                        </label>
                        {errors?.ProductInfo?.[index]?.cost && (
                          <small className="text-danger">
                            {errors.ProductInfo[index].cost.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating form-floating-outline">
                        <input
                          type="file"
                          className={`form-control ${
                            errors?.ProductInfo?.[index]?.image
                              ? "is-invalid"
                              : ""
                          }`}
                          id={`imageUrl_${index}`}
                          {...register(`ProductInfo.${index}.image`)}
                          placeholder="Product Image"
                        />
                        <label htmlFor={`imageUrl_${index}`}>
                          Product Image <span className="text-danger">*</span>
                        </label>

                        {errors?.ProductInfo?.[index]?.image && (
                          <div className="invalid-feedback d-block">
                            {errors.ProductInfo[index].image.message}
                          </div>
                        )}

                        {editData && (
                          <Link
                            to={editData?.image}
                            className="d-block mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Preview
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 col-12 d-flex align-items-center mb-0">
                      <button
                        type="button"
                        className="btn btn-outline-danger waves-effect"
                        onClick={() => remove(index)}
                      >
                        <i className="mdi mdi-close me-1"></i>
                        <span className="align-middle">Delete</span>
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="col-12 d-flex justify-content-between">
                  {!editData && (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          project_name: "",
                          project_description: "",
                          rate: "",
                          gst: "",
                          cost: "",
                          image: null,
                        })
                      }
                      className="btn btn-primary waves-effect waves-light addBtn"
                    >
                      <i className="mdi mdi-plus me-1"></i>
                      <span className="align-middle">Add</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit waves-effect waves-light addSubBtn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
