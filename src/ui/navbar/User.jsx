function User() {
  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        href="javascript:void(0);"
        data-bs-toggle="dropdown"
      >
        <div className="avatar avatar-online">
          <img
            src="assets/img/avatars/1.png"
            alt=""
            className="w-px-40 h-auto rounded-circle"
          />
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a
            className="dropdown-item waves-effect"
            href="pages-account-settings-account.html"
          >
            <div className="d-flex">
              <div className="flex-shrink-0 me-3">
                <div className="avatar avatar-online">
                  <img
                    src="assets/img/avatars/1.png"
                    alt=""
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <span className="fw-medium d-block">John Doe</span>
                <small className="text-muted">Admin</small>
              </div>
            </div>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="#">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My Profile</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="goals_targets.php">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My Goal Sheet</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="goals_targets.php">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My Target Sheet</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="#">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My Follow Up</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="#">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My Earnings</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item waves-effect" href="#">
            <i className="mdi mdi-account-outline me-2"></i>
            <span className="align-middle">My To do List</span>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>

        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a
            className="dropdown-item waves-effect"
            href="login.php"
            target="_blank"
          >
            <i className="mdi mdi-logout me-2"></i>
            <span className="align-middle">Log Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default User;
