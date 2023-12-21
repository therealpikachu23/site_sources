import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div className="fixed-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light  ">
        <NavLink className="navbar-brand" to="/">
          <img style={{ "width": 40, "height": 40 }} src={require("../home.png")} alt="Logo"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/infographicsList">
                Infographies
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/booksList">
                Livres
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/sourcesList">
                Sources
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/tagList">
                Tags
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/videosList">
                Vidéos
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/addBook">
                Ajouter livre
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/addSource">
                Ajouter source
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/addTag">
                Ajouter tag
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/addVideo">
                Ajouter video
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                <img style={{ "width": 40, "height": 40 }} src={require("../email.png")} alt="Contact"></img>
              </NavLink>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  );
} 