import React from "react";
import Toast from "react-bootstrap/Toast";
import { ERROR } from "../../store/constants";
import { connect } from "react-redux";

class Toastr extends React.PureComponent {
  constructor(props) {
    super(props);
    this.style = {
      position: "absolute",
      bottom: 0,
      maxWidth: "100vw",
      width: "98vw",
      left: "1vw",
      zIndex: "9999",
    };
  }

  handleClose = () => this.props.dispatch({ type: ERROR, payload: "" });

  render() {
    const { error } = this.props;
    return (
      <Toast
        style={this.style}
        onClose={this.handleClose}
        show={error}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">
            {error.message ? error.message : "Something went wrong!"}
          </strong>
          <small>Just now</small>
        </Toast.Header>
        {error.body && (
          <Toast.Body>
            <span className="mr-auto">body</span>
          </Toast.Body>
        )}
      </Toast>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Toastr);
