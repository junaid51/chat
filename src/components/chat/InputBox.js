import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as sendButton } from "@fortawesome/free-solid-svg-icons";

const InputBox = ({ handleSubmit }) => {
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");

  // const handleKeyDown = (e) => {
  //   // Reset field height
  //   e.target.style.height = "inherit";

  //   // Get the computed styles for the element
  //   const computed = window.getComputedStyle(e.target);

  //   // Calculate the height
  //   const height =
  //     parseInt(computed.getPropertyValue("border-top-width"), 10) +
  //     parseInt(computed.getPropertyValue("padding-top"), 10) +
  //     e.target.scrollHeight +
  //     parseInt(computed.getPropertyValue("padding-bottom"), 10) +
  //     parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  //   e.target.style.height = `${height}px`;
  // };

  return (
    <div className="d-flex flex-column border-top">
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
          className="form-control border-0"
          placeholder="Leave a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
        />
        {/* <textarea
          ref={inputRef}
          type="text"
          name="message"
          id="message"
          className="form-control"
          placeholder="Leave a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          rows={1}
          onKeyDown={handleKeyDown}
        /> */}
        <button style={{ color: "inherit" }} className="btn" type="submit">
          <FontAwesomeIcon icon={sendButton} />
        </button>
      </form>
    </div>
  );
};

export default InputBox;
