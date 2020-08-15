import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as sendButton } from "@fortawesome/free-solid-svg-icons";

const ChatInput = ({ handleSubmit }) => {
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");

  return (
    <div className="d-flex flex-column mb-2 ml-2">
      <form
        autoComplete="off"
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(message);
          setMessage("");
          inputRef.current.focus();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          name="message"
          id="message"
          className="form-control border"
          placeholder="Leave a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
        />
        <button style={{ color: "inherit" }} className="btn" type="submit">
          <FontAwesomeIcon icon={sendButton} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
