import React, { useEffect, useRef, useCallback, useState } from "react";
import { Spinner } from "../../bs-components/Loaders";
import { executeNextInQueue } from "../../../utils/globalFunctions";
import ChatList from "./ChatList";

const ChatMain = ({
  getGeneralChat,
  generalChat,
  user,
  channel,
  disconnect,
  loading,
  loadMoreChat,
  loadingMoreChat,
  chatScroll,
}) => {
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

  return (
    <>
      <ul ref={listRef} className="list-unstyled px-3 chat-list text-break">
        {loadingMoreChat && (
          <div className="text-center mb-2">
            <Spinner />
          </div>
        )}
        {infiniteScroll && <li key="intersecting" ref={bottomBoundaryRef} />}
        {generalChat && <ChatList generalChat={generalChat} user={user} />}
      </ul>
      {loading && !generalChat && (
        <div className="text-center mb-2">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ChatMain;
