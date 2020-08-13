import React from "react";
import { login } from "../../store/actions/baseActions";
import { connect } from "react-redux";
import AuthForm from "./AuthForm";

const Login = (props) => {
  return <AuthForm {...props} component="login" />;
};

function mapStateToProps(state) {
  return {
    error: state.error,
    loading: state.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: login(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
