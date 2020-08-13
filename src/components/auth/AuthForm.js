import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../bs-components/Loaders";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      save: false,
    };
  }
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, username, password, save } = this.state;
    if (this.props.component === "register") {
      this.props.register(email, username, password, save);
    } else {
      this.props.login(email, password, save);
    }
  };
  render() {
    const { email, username, password, save } = this.state;
    const { error, loading, component } = this.props;
    return (
      <div className="auth--container slideInLeft">
        <h1>
          {component === "register" ? "Register" : "Login to"} your account
        </h1>
        {error && <p className="error-message">{error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          {component === "register" && (
            <>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={this.handleChange}
              />
            </>
          )}
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Choose a password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
          {component === "login" && (
            <>
              <input
                type="checkbox"
                name="save"
                id="save"
                value={save}
                onChange={this.handleChange}
                className="checkbox"
              />{" "}
              <label className="checkbox" htmlFor="save">
                Remember me!
              </label>
            </>
          )}
          <button
            className="general-submit"
            disabled={loading}
            children="Get Started"
          />
          {component === "register" && (
            <p>
              Already have an account?{" "}
              <Link className="login-btn" to="/login">
                Login here
              </Link>
            </p>
          )}
          {component === "login" && (
            <p>
              Don't have an account?{" "}
              <Link className="login-btn" to="/register">
                Signup here
              </Link>
            </p>
          )}
          {loading && <Spinner />}
        </form>
      </div>
    );
  }
}

AuthForm.defaultProps = {
  component: "register",
};

export default AuthForm;
