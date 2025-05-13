function Dropdown() {
  return (
    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-1 me-xl-0">
      <div
        className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow waves-effect waves-light"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className="mdi mdi-view-grid-plus-outline mdi-24px"></i>
      </div>
      <div className="dropdown-menu dropdown-menu-end py-0">
        <div className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
            <a
              href="javascript:void(0)"
              className="dropdown-shortcuts-add text-muted"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Add shortcuts"
              data-bs-original-title="Add shortcuts"
            >
              <i className="mdi mdi-view-grid-plus-outline mdi-24px"></i>
            </a>
          </div>
        </div>
        <div className="dropdown-shortcuts-list scrollable-container ps">
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
          <div className="row row-bordered overflow-visible g-0">
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-account-outline fs-4"></i>
              </span>
              <a href="app-user-list.html" className="stretched-link">
                User App
              </a>
              <small className="text-muted mb-0">Manage Users</small>
            </div>
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-shield-check-outline fs-4"></i>
              </span>
              <a href="app-access-roles.html" className="stretched-link">
                Role Management
              </a>
              <small className="text-muted mb-0">Permission</small>
            </div>
          </div>
          <div className="row row-bordered overflow-visible g-0">
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-chart-pie-outline fs-4"></i>
              </span>
              <a href="index.html" className="stretched-link">
                Dashboard
              </a>
              <small className="text-muted mb-0">Analytics</small>
            </div>
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-cog-outline fs-4"></i>
              </span>
              <a
                href="pages-account-settings-account.html"
                className="stretched-link"
              >
                Setting
              </a>
              <small className="text-muted mb-0">Account Settings</small>
            </div>
          </div>
          <div className="row row-bordered overflow-visible g-0">
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-help-circle-outline fs-4"></i>
              </span>
              <a href="pages-faq.html" className="stretched-link">
                FAQs
              </a>
              <small className="text-muted mb-0">FAQs &amp; Articles</small>
            </div>
            <div className="dropdown-shortcuts-item col">
              <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                <i className="mdi mdi-dock-window fs-4"></i>
              </span>
              <a href="modal-examples.html" className="stretched-link">
                Modals
              </a>
              <small className="text-muted mb-0">Useful Popups</small>
            </div>
          </div>
          <div className="ps__rail-x">
            <div
              className="ps__thumb-x"
              tabIndex="0"
              // style={{ left: "0px", width: "0px" }}
            ></div>
          </div>
          <div className="ps__rail-y">
            <div
              className="ps__thumb-y"
              tabIndex="0"
              // style="top: 0px; height: 0px;"
            ></div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Dropdown;
