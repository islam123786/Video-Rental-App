import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Vidly</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
            {!this.props.user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {this.props.user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {this.props.user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
