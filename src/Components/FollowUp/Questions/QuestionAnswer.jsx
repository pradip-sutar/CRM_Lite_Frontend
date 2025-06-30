import React, { useState, useEffect } from "react";
import { getProductForm } from "../../../services/Product/apiProductForm";
import {
  postQuestions,
  getQuestions,
} from "../../../services/FollowUp/Questions/apiQuestions";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  postQuestionsAnswer,
  getQuestionsAnswer,
} from "../../../services/FollowUp/Questions/apiQuestionAnswer";
import { useNavigate } from "react-router-dom";

const QuestionAnswer = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { category: "", questions: [{ text: "", children: [], answer: "" }] },
  ]);
  const [selectedProject, setSelectedProject] = useState("");
  const location = useLocation();
  const { confirm_project = "", enquiry_id = "" } = location?.state;

  useEffect(() => {
    if (confirm_project) {
      setSelectedProject(confirm_project);
    }
  }, []);

  const [productData, setProductData] = useState([]);
  const initialUrl = `/api/project_new_handler/`;

  const fetchData = async () => {
    const response = await getProductForm(initialUrl);
    setProductData(response);
  };

  const addAnswerFields = (requirements) => {
    return requirements.map((category) => ({
      ...category,
      questions: category.questions.map(addAnswerToQuestion),
    }));
  };

  const addAnswerToQuestion = (question) => ({
    ...question,
    answer: question.answer || "",
    children: question.children?.map(addAnswerToQuestion) || [],
  });

  const fetchQuestionReletedToProject = async () => {
    setCategories([
      { category: "", questions: [{ text: "", children: [], answer: "" }] },
    ]);
    let response;

    response = await getQuestionsAnswer(enquiry_id);
    console.log(response);

    if (!response.error == "No answers found") {
      if (response?.data.requirements) {
        const updated = addAnswerFields(response.data.requirements);
        setCategories(updated);
      }
    } else {
      response = await getQuestions(selectedProject);
      if (response?.requirements) {
        const updated = addAnswerFields(response.requirements);
        setCategories(updated);
      }
    }
  };

  useEffect(() => {
    if (selectedProject) fetchQuestionReletedToProject();
  }, [selectedProject, enquiry_id]);

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].category = value;
    setCategories(updated);
  };

  const handleAnswerChange = (catIndex, path, value) => {
    const updated = [...categories];
    let current = updated[catIndex].questions;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }

    current[path[path.length - 1]].answer = value;
    setCategories(updated);
  };

  const handleSubmit = async () => {
    if (!selectedProject) {
      toast.error("Choose Project and Questions Accordingly");
      return;
    }

    const formatedData = {
      confirm_project: confirm_project,
      enquiry_id: enquiry_id,
      requirements: categories,
    };

    try {
      const status = await postQuestionsAnswer(formatedData);
      toast.success("Answer submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }

    console.log("Submitted Data:", categories);
  };

  const renderQuestions = (questions, catIndex, path = [], depth = 1) =>
    questions.map((q, index) => {
      const currentPath = [...path, index];
      return (
        <div
          key={currentPath.join("-")}
          className={`ps-${depth * 2} border-start border-2 ms-5 mt-1`}
        >
          <div className="row g-2 align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-question-circle text-danger"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add question on this Project First"
                  value={q.text}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-pencil-square text-success"></i>
                </span>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter answer"
                  value={q.answer}
                  onChange={(e) =>
                    handleAnswerChange(catIndex, currentPath, e.target.value)
                  }
                />
              </div>
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
    <div className="container ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Question Builder</h3>
      </div>

      <div className="row ">
        <div className="col-md-4">
          <label>Project</label>
          <select
            className="dropdown form-control mb-2"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            disabled={true}
          >
            <option value="">Select Project</option>
            {productData?.map((data) => (
              <option key={data.project_id} value={data.project_id}>
                {data.project_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2 text-end ">
          <div
            className="ms-2 btn btn-primary btn-sm waves-effect waves-light w-md-75 "
            onClick={() => navigate(-1)}
          >
            <span className="mdi mdi-keyboard-backspace" />
          </div>
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
                disabled
                onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Questions</h6>
            </div>

            {renderQuestions(cat.questions, catIndex)}
          </div>
        </div>
      ))}

      <div className="text-end">
        {categories?.[0].category && (
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            <i className="bi bi-send-check me-2"></i>Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswer;
