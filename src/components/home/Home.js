import React from "react";
import { connect } from "react-redux";
import {
  login,
  setPushNotificationToken,
  logout,
} from "../../store/actions/baseActions";
import { globals } from "../../utils/globals";
import firebase from "../../config/firebase";
import { setValue, getValue } from "../../utils/globalFunctions";
import { ChatSidebar, Chatbox } from "../chat";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
    };
  }

  async askForPushNotification() {
    if (firebase.messaging.isSupported()) {
      const { gcmTokenName } = globals;
      let token = await getValue(gcmTokenName);
      if (!token) {
        try {
          await firebase.messaging().requestPermission();
          const token = await firebase.messaging().getToken();
          setPushNotificationToken(this.props.user.user_id, token);
          setValue(gcmTokenName, token);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.user) this.askForPushNotification();
  }

  handleSetChannel = (channel) => {
    this.setState({ channel: "" }, () => {
      globals.selectedChannel = channel;
      this.setState({ channel });
    });
  };

  render() {
    const { channel } = this.state;
    const { user } = this.props;
    return (
      <div className="container-fluid p-0 main">
        {user && (
          <>
            <div className="row no-gutters chat-container">
              <div
                className={
                  "col col-sm-4 h-100 border-right  d-sm-block " +
                  (channel ? "d-none" : "d-block")
                }
              >
                <ChatSidebar
                  handleSetChannel={this.handleSetChannel}
                  channel={channel}
                />
              </div>
              <div
                className={
                  "col col-sm-8 d-sm-block h-100 " +
                  (channel ? "d-block" : "d-none")
                }
              >
                {channel && (
                  <Chatbox
                    user={user}
                    channel={channel}
                    handleSetChannel={this.handleSetChannel}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: login(dispatch),
    logout: logout(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
