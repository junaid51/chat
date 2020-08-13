import React from "react";
import { globals } from "../../utils/globals";

export const ChatSidebar = ({ handleSetChannel, channel }) => (
  <ul
    style={{ cursor: "pointer" }}
    className="list-group list-group-flush border-bottom"
  >
    {globals.channels.map((val) => {
      return (
        <li
          onClick={() => {
            handleSetChannel(val);
          }}
          className={
            "list-group-item list-group-item-action " +
            (val === channel ? "active" : "")
          }
          key={val}
        >
          <strong>{val}</strong>
          <div className="small text-muted text-truncate">
            This is a lengthy text to test the subtitle
          </div>
        </li>
      );
    })}
  </ul>
);
