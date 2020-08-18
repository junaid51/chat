import React from "react";
import linkify from "linkifyjs/html";
import { formatTimestamp } from "../../../utils/globalFunctions";

const ChatList = ({ generalChat, user }) => {
  const currentDate = formatTimestamp(new Date(), "DATE_WEEKDAY");
  let lastChatData = {};

  return generalChat.map((chat, index) => {
    const { user: lastUser, time: lastTime, date: lastDate } = lastChatData;
    const postDate = new Date(chat.timestamp);
    const date = formatTimestamp(postDate, "DATE_WEEKDAY");
    const time = formatTimestamp(postDate, "TIME");
    const currUser = chat.user === user.displayName;
    const showUser = chat.user !== lastUser;
    lastChatData = { ...chat, time, date };
    return (
      <React.Fragment key={chat.id}>
        {date !== lastDate && (
          <li className="text-center text-muted small my-2">
            {date === currentDate ? "Today" : date}
          </li>
        )}
        <li
          className={
            "fadeIn chat mb-1 d-flex justify-content-end " +
            (currUser ? "flex-row" : "flex-row-reverse")
          }
        >
          {(time !== lastTime || showUser) && (
            <div
              className="small text-muted mx-2 mt-auto"
              style={{ lineHeight: "2rem" }}
            >
              {time}
            </div>
          )}
          <div style={{ maxWidth: "75%" }}>
            <div className={currUser ? "text-right" : "text-left"}>
              {!currUser && showUser && (
                <strong>{chat.user}&nbsp;&nbsp;</strong>
              )}
            </div>
            <div
              className={
                (currUser ? "from-me" : "from-them") +
                (generalChat[index + 1] &&
                chat.user === generalChat[index + 1].user
                  ? ""
                  : " pointer")
              }
              dangerouslySetInnerHTML={{ __html: linkify(chat.message) }}
            />
          </div>
        </li>
      </React.Fragment>
    );
  });
};

export default ChatList;
