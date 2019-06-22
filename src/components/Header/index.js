import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

import "./header.scss";
import logo from "../../assets/logo-hbsis.svg";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <span className="app-title">
          to
          <FontAwesomeIcon icon={faCheckDouble} />
          do
        </span>
        <img src={logo} alt="Logo HBSIS" />
      </div>
    </header>
  );
}
