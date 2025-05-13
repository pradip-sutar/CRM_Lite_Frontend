function Notification() {
  return (
    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-2 me-xl-1">
      <div
        className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow waves-effect waves-light"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className="mdi mdi-bell-outline mdi-24px"></i>
        <span className="position-absolute top-0 start-50 translate-middle-y badge badge-dot bg-danger mt-2 border"></span>
      </div>
      <ul className="dropdown-menu dropdown-menu-end py-0">
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h6 className="mb-0 me-auto">Notification</h6>
            <span className="badge rounded-pill bg-label-primary">8 New</span>
          </div>
        </li>
        <li className="dropdown-notifications-list scrollable-container ps">
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action dropdown-notifications-item waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <img
                      src="assets/img/avatars/1.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">
                    Congratulation Lettie 🎉
                  </h6>
                  <small className="text-truncate text-body">
                    Won the monthly best seller gold badge
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">1h ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <span className="avatar-initial rounded-circle bg-label-danger">
                      CF
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">Charles Franklin</h6>
                  <small className="text-truncate text-body">
                    Accepted your connection
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">12hr ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <img
                      src="assets/img/avatars/2.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">New Message ✉️</h6>
                  <small className="text-truncate text-body">
                    You have new message from Natalie
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">1h ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      <i className="mdi mdi-cart-outline"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">
                    Whoo! You have new order 🛒
                  </h6>
                  <small className="text-truncate text-body">
                    ACME Inc. made new order $1,154
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">1 day ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <img
                      src="assets/img/avatars/9.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">
                    Application has been approved 🚀
                  </h6>
                  <small className="text-truncate text-body">
                    Your ABC project application has been approved.
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">2 days ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      <i className="mdi mdi-chart-pie-outline"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">
                    Monthly report is generated
                  </h6>
                  <small className="text-truncate text-body">
                    July monthly financial report is generated{" "}
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">3 days ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <img
                      src="assets/img/avatars/5.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">
                    Send connection request
                  </h6>
                  <small className="text-truncate text-body">
                    Peter sent you connection request
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">4 days ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <img
                      src="assets/img/avatars/6.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1 text-truncate">New message from Jane</h6>
                  <small className="text-truncate text-body">
                    Your have new message from Jane
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">5 days ago</small>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read waves-effect">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <div className="avatar me-1">
                    <span className="avatar-initial rounded-circle bg-label-warning">
                      <i className="mdi mdi-alert-circle-outline"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                  <h6 className="mb-1">CPU is running high</h6>
                  <small className="text-truncate text-body">
                    CPU Utilization Percent is currently at 88.63%,
                  </small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <small className="text-muted">5 days ago</small>
                </div>
              </div>
            </li>
          </ul>
          <div className="ps__rail-x">
            <div
              className="ps__thumb-x"
              tabIndex="0"
              // style="left: 0px; width: 0px;"
            ></div>
          </div>
          <div className="ps__rail-y">
            <div
              className="ps__thumb-y"
              tabIndex="0"
              // style="top: 0px; height: 0px;"
            ></div>
          </div>
        </li>
        <li className="dropdown-menu-footer border-top p-2">
          <a
            href="javascript:void(0);"
            className="btn btn-primary d-flex justify-content-center waves-effect waves-light"
          >
            View all notifications
          </a>
        </li>
      </ul>
    </li>
  );
}

export default Notification;
