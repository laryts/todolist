import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./loading.scss";

const Loading = () => (
  <div className="loading">
    <div className="icon">
      <FontAwesomeIcon icon={faSpinner} pulse />
    </div>
    <div className="text">Loading...</div>
  </div>
);

export default Loading;
