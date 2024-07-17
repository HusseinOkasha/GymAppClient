import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GymApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li
              className="nav-item dropdown"
              onClick={() => console.log("clicked")}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/owner-account-manager"
                    replace
                  >
                    Owner Accounts
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Coach Accounts
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Client Accounts
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="logout">
            <button className="btn btn-outline-secondary" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
