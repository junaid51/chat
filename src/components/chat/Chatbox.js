import React from "react";
import { connect } from "react-redux";
import {
  getGeneralChat,
  postGeneralChat,
  disconnect,
  loadMoreChat,
} from "../../store/actions/chatActions";
import { globals } from "../../utils/globals";
import { ChatTopbar, ChatMain, ChatInput } from ".";

const Chatbox = (props) => {
  const {
    handleSetChannel,
    postGeneralChat,
    channel,
    user,
    ...remainingProps
  } = props;

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

  return (
    <div className="chatbox">
      <ChatTopbar handleSetChannel={handleSetChannel} />
      <ChatMain user={user} channel={channel} {...remainingProps} />
      <ChatInput handleSubmit={handleSubmit} />
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
