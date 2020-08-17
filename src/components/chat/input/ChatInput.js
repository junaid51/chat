import React, { createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as sendButton } from "@fortawesome/free-solid-svg-icons";

class ChatInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.inputRef = createRef(null);
  }

  render() {
    return (
      <div className="d-flex flex-column mb-2 ml-2">
        <form
          autoComplete="off"
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.handleSubmit(this.state.message);
            this.setState({ message: "" });
            this.inputRef.current.focus();
          }}
        >
          <input
            ref={this.inputRef}
            type="text"
            name="message"
            id="message"
            className="form-control border"
            placeholder="Leave a message..."
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
            maxLength={200}
          />
          <button style={{ color: "inherit" }} className="btn" type="submit">
            <FontAwesomeIcon icon={sendButton} />
          </button>
        </form>
      </div>
    );
  }
}

export default ChatInput;
