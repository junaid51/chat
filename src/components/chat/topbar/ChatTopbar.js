import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft as backButton } from "@fortawesome/free-solid-svg-icons";

const ChatTopbar = ({ handleSetChannel, channel }) => (
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
      <FontAwesomeIcon icon={backButton} />
    </button>
    <div
      className="text-truncate ml-2"
      style={{ fontWeight: "400", fontSize: "1.5rem" }}
    >
      {channel}
    </div>
  </div>
);

export default ChatTopbar;
