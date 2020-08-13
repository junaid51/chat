import React, { useEffect, useRef, useCallback, useState } from "react";
import { connect } from "react-redux";
import {
  getGeneralChat,
  postGeneralChat,
  disconnect,
  loadMoreChat,
} from "../../store/actions/chatActions";
import { Spinner } from "../bs-components/Loaders";
import { globals } from "../../utils/globals";
import InputBox from "./InputBox";
import linkify from "linkifyjs/html";
import { executeNextInQueue } from "../../utils/globalFunctions";

const Chatbox = ({
  getGeneralChat,
  generalChat,
  postGeneralChat,
  user,
  channel,
  disconnect,
  loading,
  loadMoreChat,
  loadingMoreChat,
  chatScroll,
}) => {
  let dateStore = "";
  let currentDate = new Date();
  currentDate =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getUTCFullYear();
  let lastChatData = {
    user: "",
    timestamp: "",
    id: "",
    message: "",
    time: "",
  };

  const [infiniteScroll, setInfiniteScroll] = useState(false);

  const listRef = useRef(null);
  const firstChatRef = useRef(null);
  const prevScrollRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            if (!loadingMoreChat) {
              loadMoreChat(channel, firstChatRef.current);
              prevScrollRef.current = listRef.current.scrollHeight;
            }
          }
        });
      }).observe(node);
    },
    [channel, loadMoreChat, loadingMoreChat]
  );

  const bottomBoundaryRef = useCallback((node) => {
    if (node) {
      executeNextInQueue(scrollObserver, node);
    }
  }, []);

  useEffect(() => {
    getGeneralChat(channel);
    return () => {
      disconnect();
    };
  }, [getGeneralChat, channel, disconnect]);

  useEffect(() => {
    if (generalChat) {
      firstChatRef.current =
        generalChat && generalChat.length > 0 ? generalChat[0].id : null;
      if (chatScroll === "down") {
        listRef.current.scrollTo(0, listRef.current.scrollHeight);
      } else {
        const newScroll = listRef.current.scrollHeight - prevScrollRef.current;
        listRef.current.scrollTo(0, newScroll);
      }
    }
  }, [generalChat, chatScroll, listRef, firstChatRef]);

  useEffect(() => {
    if (!infiniteScroll) {
      const threshold = 100;
      if (listRef) {
        const { offsetHeight, scrollHeight } = listRef.current;
        if (scrollHeight > offsetHeight + threshold) {
          setInfiniteScroll(true);
        }
      }
    }
  }, [generalChat]);

  const handleSubmit = (message) => {
    if (message !== "") {
      const chat = {
        message,
        user: user.displayName,
        timestamp: new Date().getTime(),
      };
      postGeneralChat(chat, channel);
    }
  };

  const generalItems =
    generalChat &&
    generalChat.map((chat) => {
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
              <div
                dangerouslySetInnerHTML={{ __html: linkify(chat.message) }}
              />
            </div>
          </li>
        </React.Fragment>
      );
    });
  return (
    <div className="chatbox">
      <ul ref={listRef} className="list-unstyled px-3 chat-list text-break">
        {loadingMoreChat && (
          <div className="text-center mb-2">
            <Spinner />
          </div>
        )}
        {infiniteScroll && <div key="intersecting" ref={bottomBoundaryRef} />}
        {generalChat && generalItems}
      </ul>
      {loading && !generalChat && (
        <div className="text-center mb-2">
          <Spinner />
        </div>
      )}
      <InputBox handleSubmit={handleSubmit} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    generalChat: state.chat[globals.selectedChannel],
    loading: state.loading,
    loadingMoreChat: state.loadingMoreChat,
    chatScroll: state.chatScroll,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getGeneralChat: getGeneralChat(dispatch),
    postGeneralChat: postGeneralChat(dispatch),
    loadMoreChat: loadMoreChat(dispatch),
    disconnect: disconnect(dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
