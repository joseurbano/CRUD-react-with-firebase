import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

export default function Nav() {
  const dispatch = useDispatch();

  function userLogOut() {
    dispatch({ type: "LOG_OUT" });
    firebase.auth().signOut();
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand text-white font-weight-bold">CRUD</span>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {useSelector((state) => state.userIsLogged) === 1 ? (
            <>
              <li className="nav-item mx-1">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link
                  className="nav-link"
                  onClick={() => userLogOut()}
                  to="/login"
                >
                  Sair
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
