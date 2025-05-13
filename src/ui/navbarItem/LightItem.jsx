function LightItem({ icon, light }) {
  return (
    <li>
      <a
        className="dropdown-item waves-effect"
        href="javascript:void(0);"
        data-theme="light"
      >
        <span className="align-middle">
          <i className={`mdi mdi-${icon} me-2`}></i>
          {light}
        </span>
      </a>
    </li>
  );
}

export default LightItem;
