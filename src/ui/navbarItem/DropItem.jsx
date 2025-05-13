function DropItem() {
  return (
    <div className="row row-bordered overflow-visible g-0">
      <div className="dropdown-shortcuts-item col">
        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
          <i className="mdi mdi-calendar fs-4"></i>
        </span>
        <a href="app-calendar.html" className="stretched-link">
          Calendar
        </a>
        <small className="text-muted mb-0">Appointments</small>
      </div>
      <div className="dropdown-shortcuts-item col">
        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
          <i className="mdi mdi-file-document-outline fs-4"></i>
        </span>
        <a href="app-invoice-list.html" className="stretched-link">
          Invoice App
        </a>
        <small className="text-muted mb-0">Manage Accounts</small>
      </div>
    </div>
  );
}

export default DropItem;
