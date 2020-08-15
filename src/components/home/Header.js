import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/baseActions";
import Theme from "./Theme";
import { REGISTER, LOGIN } from "../../store/constants";

const Header = ({ user, channel, logout }) => {
  return (
    <header
      className={"border-bottom d-sm-block " + (channel ? "d-none" : "d-block")}
    >
      <nav
        className="navbar navbar-light"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          {user && user.displayName}
        </div>
        <div>
          <Theme />
          {!user && (
            <Link className="btn btn-link" to={LOGIN}>
              Login
            </Link>
          )}
          {!user && (
            <Link className="btn btn-link" to={REGISTER}>
              Register
            </Link>
          )}
          {user && (
            <button className="btn btn-link" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    channel: state.selectedChannel,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: logout(dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
