import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{ flexDirection: "column", height: "100vh", textAlign: "center" }}
      className="d-flex justify-content-center align-items-center" >
      <h1>404 - דף לא נמצא</h1>
      <p>המצטערים, הדף שביקשת לא נמצא.</p>
      <Link to="/">חזרה לעמוד הראשי</Link>
    </div>
  );
};

export default PageNotFound;
