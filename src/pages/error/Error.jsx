import React from "react";
import { Link } from "react-router-dom";
import "./error.scss";

const ErrorPage = () => {
  return (
    <div className="errorContainer">
      <h1>Page not found</h1>
      <Link to={"/"}>Back to homepage</Link>
    </div>
  );
};

export default ErrorPage;
