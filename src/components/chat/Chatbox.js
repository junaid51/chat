import React from "react";
import { connect } from "react-redux";
import {
  getGeneralChat,
  postGeneralChat,
  disconnect,
  loadMoreChat,
} from "../../store/actions/chatActions";
import { ChatTopbar, ChatMain, ChatInput } from ".";

class Chatbox extends React.PureComponent {
  handleSubmit = (message) => {
    const { channel, user } = this.props;
    if (message !== "") {
      const chat = {
        message,
        user: user.displayName,
        timestamp: new Date().getTime(),
      };
      this.props.postGeneralChat(chat, channel);
    }
  };

  render() {
    const { handleSetChannel, channel, user, ...remainingProps } = this.props;
    return (
      <div className="chatbox">
        <ChatTopbar channel={channel} handleSetChannel={handleSetChannel} />
        <ChatMain user={user} channel={channel} {...remainingProps} />
        <ChatInput handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    generalChat: state.chat[state.selectedChannel],
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
