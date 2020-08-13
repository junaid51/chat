import React from "react";
import { NavLink } from "react-router-dom";

export default function ComponentNotFound() {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Oops..</h1>
        <p className="lead">
          You tried to mess with the app and alas here you are. Please try&nbsp;
          <strong>reloading</strong> the app and if the problem still persists,
          please clean the <strong>cache</strong> and try again!
        </p>
        <p>
          <strong>
            Note: Please click <NavLink to="/"> here</NavLink> if this was not
            intentional!
          </strong>
        </p>
      </div>
    </div>
  );
}
