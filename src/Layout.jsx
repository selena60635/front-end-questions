import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  TaskOne
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  TaskTwo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users/sort">
                  TaskThree
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users/pagination">
                  TaskFour
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
