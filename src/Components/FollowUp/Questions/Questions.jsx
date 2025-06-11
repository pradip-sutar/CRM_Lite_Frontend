import React, { useState, useEffect } from "react";
import { getProductForm } from "../../../services/Product/apiProductForm";
import { postQuestions } from "../../../services/FollowUp/Questions/apiQuestions";
import toast from "react-hot-toast";

const Questions = () => {
  const [productData, setProductData] = useState([]);
  const initialUrl = `/api/project_new_handler/`;
  const fetchData = async () => {
    const response = await getProductForm(initialUrl);
    setProductData(response);
    console.log(response);
  };
  const [selectedProject, setSelectedProject] = useState("");

  const [categories, setCategories] = useState([
    { category: "", questions: [{ text: "", children: [] }] },
  ]);

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].category = value;
    setCategories(updated);
  };

  const handleQuestionTextChange = (catIndex, path, value) => {
    const updated = [...categories];
    let ref = updated[catIndex].questions;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]].children;
    }
    ref[path[path.length - 1]].text = value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      { category: "", questions: [{ text: "", children: [] }] },
    ]);
  };

  const deleteCategory = (catIndex) => {
    const updated = [...categories];
    updated.splice(catIndex, 1);
    setCategories(updated);
  };

  const addQuestion = (catIndex, path = []) => {
    const updated = [...categories];
    let ref = updated[catIndex].questions;
    for (let i = 0; i < path.length; i++) {
      ref = ref[path[i]].children;
    }
    ref.push({ text: "", children: [] });
    setCategories(updated);
  };

  const deleteQuestion = (catIndex, path) => {
    const updated = [...categories];
    let ref = updated[catIndex].questions;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]].children;
    }
    ref.splice(path[path.length - 1], 1);
    setCategories(updated);
  };

  const handleSubmit = async () => {
    if (!selectedProject) {
      toast.error("Choose Project and Questions Accordingly");
    }
    const formatedData = {
      project_id: selectedProject,
      requirements: categories,
    };
    try {
      const status = await postQuestions(formatedData);
    } catch (error) {
      console.log(error);
    }
    console.log("Submitted Data:", categories);
  };

  const renderQuestions = (questions, catIndex, path = [], depth = 1) =>
    questions.map((q, index) => {
      const currentPath = [...path, index];
      return (
        <div
          key={currentPath.join("-")}
          className={`ps-${depth * 2}  border-start border-2 ms-5  mt-1`}
        >
          <div className="row g-2 align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-question-circle text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter question"
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionTextChange(
                      catIndex,
                      currentPath,
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="col-auto d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-danger"
                title="Delete"
                onClick={() => deleteQuestion(catIndex, currentPath)}
              >
                <i className="bi bi-trash3"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-success"
                title="Add Sub-question"
                onClick={() => addQuestion(catIndex, currentPath)}
              >
                <i className="bi bi-node-plus"></i>
              </button>
            </div>
          </div>

          {q.children.length > 0 &&
            renderQuestions(q.children, catIndex, currentPath, depth + 1)}
        </div>
      );
    });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Question Builder</h3>

        <button className="btn btn-success" onClick={addCategory}>
          <i className="bi bi-folder-plus me-2"></i>Add Category
        </button>
      </div>
      <div className="row g-4">
        <div className="col-md-4">
          <label>Project</label>

          <select
            className="dropdown form-control mb-2"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedProject(e.target.value);
            }}
          >
            <option value="">Select Project</option>
            {productData?.map((data) => (
              <option value={data.project_id}>{data.project_name}</option>
            ))}
          </select>
        </div>
      </div>

      {categories.map((cat, catIndex) => (
        <div className="card shadow-sm mb-4" key={catIndex}>
          <div className="card-header bg-primary border-bottom d-flex justify-content-between align-items-center">
            <div className="input-group w-75">
              <span className="input-group-text bg-light">
                <i className="bi bi-folder text-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                value={cat.category}
                onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
              />
            </div>
            <button
              className="btn btn-danger"
              title="Delete Category"
              onClick={() => deleteCategory(catIndex)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Questions</h6>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => addQuestion(catIndex)}
              >
                <i className="bi bi-plus-circle me-1"></i>Root Question
              </button>
            </div>

            {renderQuestions(cat.questions, catIndex)}
          </div>
        </div>
      ))}

      <div className="text-end">
        <button className="btn btn-primary px-4" onClick={handleSubmit}>
          <i className="bi bi-send-check me-2"></i>Submit
        </button>
      </div>
    </div>
  );
};

export default Questions;
