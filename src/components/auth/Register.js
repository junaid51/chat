import React from "react";
import { register } from "../../store/actions/baseActions";
import { connect } from "react-redux";
import AuthForm from "./AuthForm";

const Register = (props) => {
  return <AuthForm {...props} component="register" />;
};

function mapStateToProps(state) {
  return {
    error: state.error,
    loading: state.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    register: register(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
