import firebase from "../../config/firebase";
import {
  ERROR,
  LOADING,
  GET_CHAT,
  LOAD_MORE_CHAT,
  LOAD_MORE_LOADING,
} from "../constants";
import { globals } from "../../utils/globals";
import { disconnectChat } from "../../utils/globalFunctions";

const { chatroomPath } = globals;
const chatLimit = 50;
let loadMorePrevKey = "";

const sendPushNotification = ({ name, message, channel }) => {
  firebase
    .database()
    .ref("users")
    .once("value", (snapshot) => {
      const getVal = snapshot.val();
      const tokens = [];
      for (let val in getVal) {
        if (getVal[val].name !== name) tokens.push(getVal[val].gcm_sender_id);
      }

      if (tokens.length > 0) {
        const fetchOptions = {
          mode: "cors",
          method: "POST",
          headers: {
            authorization: "key=" + globals.gcmServerKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collapse_key: "chat_notif",
            data: {
              notification: {
                body: message,
                title: channel,
                userName: name,
                key_1: "Value for key_1",
                key_2: "Value for key_2",
              },
            },
            registration_ids: tokens,
          }),
        };

        fetch(
          "https://fcm.googleapis.com/fcm/send",
          fetchOptions
        ).then((response) => console.log(response));
      }
    });
};

export const postGeneralChat = (dispatch) => async (chat, channel) => {
  try {
    const chatRef = firebase.database().ref(chatroomPath + channel);
    chatRef.push(chat);
    sendPushNotification({ name: chat.user, message: chat.message, channel });
  } catch (e) {
    dispatch({ type: ERROR, payload: e });
  }
};

export const getGeneralChat = (dispatch) => async (channel) => {
  dispatch({ type: LOADING, payload: true });

  const chatRef = firebase.database().ref(chatroomPath + channel);
  globals.chatRef = chatRef;
  let lastKey = "";
  await chatRef.limitToLast(chatLimit).once("value", (snapshot) => {
    const snapshotVal = snapshot.val();
    const chats = [];
    for (let val in snapshotVal) {
      const { user, message, timestamp } = snapshotVal[val];
      if (!globals.loadedChatIds.includes(val)) {
        globals.loadedChatIds.push(val);
        chats.push({
          id: val,
          user,
          message,
          timestamp,
        });
      }
      lastKey = val;
    }
    dispatch({
      type: GET_CHAT,
      payload: { key: channel, value: chats },
    });
  });

  chatRef
    .orderByKey()
    .startAt(lastKey)
    .on("child_added", (snapshot) => {
      const { message, user, timestamp } = snapshot.val();
      const chat = {
        id: snapshot.key,
        message,
        user,
        timestamp,
      };
      if (!globals.loadedChatIds.includes(chat.id)) {
        globals.loadedChatIds.push(chat.id);
        dispatch({
          type: GET_CHAT,
          payload: { key: channel, value: [chat] },
        });
      }
      dispatch({ type: LOADING, payload: false });
    });
};

export const loadMoreChat = (dispatch) => async (channel, lastKey) => {
  if (loadMorePrevKey !== lastKey) {
    dispatch({ type: LOAD_MORE_LOADING, payload: true });
    const chatRef = firebase.database().ref(chatroomPath + channel);
    chatRef
      .orderByKey()
      .endAt(lastKey)
      .limitToLast(chatLimit)
      .once("value", (data) => {
        const getData = data.val();
        const value = [];
        for (let val in getData) {
          if (val === lastKey) {
            continue;
          }
          getData[val].id = val;
          value.push(getData[val]);
        }
        dispatch({
          type: LOAD_MORE_CHAT,
          payload: { key: channel, value },
        });
        dispatch({ type: LOAD_MORE_LOADING, payload: false });
      });
    loadMorePrevKey = lastKey;
  }
};

export const disconnect = (dispatch) => async () => {
  disconnectChat();
};
