import { Link } from "react-router-dom";

function Title({ value, to }) {
  return (
    <div className="card-header d-flex justify-content-between align-items-center py-2">
      <h5>
        <span className="text-muted fw-light">System Admin /</span>
        {value}
      </h5>
      <div className="mb-2 text-end">
        <Link
          to={to}
          className="ms-2 btn  btn-primary btn-sm waves-effect waves-light"
        >
          <span className="mdi mdi-plus"></span>
          {value}
        </Link>
      </div>
    </div>
  );
}

export default Title;
