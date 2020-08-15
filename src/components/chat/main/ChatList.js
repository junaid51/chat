import React from "react";
import linkify from "linkifyjs/html";

const ChatList = ({ generalChat, user }) => {
  let dateStore = "";
  let currentDate = new Date();
  currentDate =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getUTCFullYear();
  const lastChatData = {
    user: "",
    timestamp: "",
    id: "",
    message: "",
    time: "",
  };

  return generalChat.map((chat) => {
    const { user: lastUser, time: lastTime } = lastChatData;
    const postDate = new Date(chat.timestamp);
    const date =
      postDate.getDate() +
      "/" +
      (postDate.getMonth() + 1) +
      "/" +
      postDate.getUTCFullYear();
    const time = postDate.getHours() + ":" + postDate.getMinutes();
    const showDate = date === dateStore ? false : true;
    const currUser = chat.user === user.displayName;
    const showUser = chat.user !== lastUser;
    const showTime = time !== lastTime;
    lastChatData.user = chat.user;
    lastChatData.id = chat.id;
    lastChatData.message = chat.message;
    lastChatData.timestamp = chat.timestamp;
    lastChatData.time = time;
    dateStore = date;
    return (
      <React.Fragment key={chat.id}>
        {showDate && (
          <li className="chat-list text-center my-2" key={date}>
            {date === currentDate ? "Today" : date}
          </li>
        )}
        <li
          className={
            "chat-list mb-2 d-flex flex-row " +
            (currUser ? "justify-content-end" : "")
          }
          key={chat.id}
        >
          <div style={{ maxWidth: "75%" }}>
            <div className={currUser ? "text-right" : ""}>
              {!currUser && showUser && (
                <strong>{chat.user}&nbsp;&nbsp;</strong>
              )}
              {(showTime || showUser) && (
                <span className="small text-muted">{time}</span>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: linkify(chat.message) }} />
          </div>
        </li>
      </React.Fragment>
    );
  });
};

export default ChatList;
