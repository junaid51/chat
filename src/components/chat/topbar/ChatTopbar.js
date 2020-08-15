import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft as closeButton } from "@fortawesome/free-solid-svg-icons";

const ChatTopbar = ({ handleSetChannel }) => (
  <div className="d-flex ">
    <button
      style={{ color: "inherit" }}
      className="btn"
      type="button"
      title="Close"
      onClick={() => {
        handleSetChannel("");
      }}
    >
      <FontAwesomeIcon icon={closeButton} />
    </button>
  </div>
);

export default ChatTopbar;
