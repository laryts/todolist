import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-content">
        <Link to="">All</Link>
        <Link to="">To do</Link>
        <Link to="">dones</Link>
      </div>
    </footer>
  );
}
