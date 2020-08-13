import React from "react";
import { globals } from "../../utils/globals";

export const ChatSidebar = ({ handleSetChannel, channel }) => (
  <ul className="list-group list-group-flush border-bottom">
    {globals.channels.map((val) => {
      return (
        <li
          onClick={() => {
            handleSetChannel(val);
          }}
          className={
            "list-group-item text-center " + (val === channel ? "active" : "")
          }
          key={val}
        >
          {val}
        </li>
      );
    })}
  </ul>
);
