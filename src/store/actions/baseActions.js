import {
  SET_USER,
  ERROR,
  CLEAR_DATA,
  HOME,
  LOGIN,
  LOADING,
  SET_CHANNEL,
  SEARCH_USER,
} from "../constants";
import firebase from "../../config/firebase";
import history from "../../routers/history";
import {
  getValue,
  deleteValue,
  disconnectChat,
} from "../../utils/globalFunctions";
import { globals } from "../../utils/globals";

const { gcmTokenName } = globals;

const getSearchUser = (dispatch) => async (search) => {
  console.log(search);
  const userRef = firebase.database().ref("users");
  userRef
    .orderByChild("email")
    .startAt(search)
    .endAt(search + "\uf8ff")
    .once("value", (snapshot) => {
      const value = snapshot.val();
      console.log(value);
      let userList = [];
      if (value) {
        for (const val in value) {
          userList.push({
            id: value[val].user_id,
            email: value[val].email,
          });
        }
        console.log(userList);
      } else {
        dispatch({ type: ERROR, payload: { message: "No users found!" } });
      }
      dispatch({ type: SEARCH_USER, payload: userList });
    });
};

const sendAddRequest = (dispatch) => async (userId, curUser) => {
  console.log(userId);
  await firebase
    .database()
    .ref("users/" + userId + "/requests/" + curUser)
    .set({ user_id: curUser, type: "RECEIVE" });
  await firebase
    .database()
    .ref("users/" + curUser + "/requests/" + userId)
    .set({ user_id: userId, type: "SENT" });

  dispatch({ type: ERROR, payload: { message: "Request has been sent!" } });
};

const updateUserEntry = async (userObj) => {
  const userRef = firebase.database().ref("users/" + userObj.user_id);
  userRef.set(userObj);
};

export const setPushNotificationToken = async (uid, token) => {
  const dbRef = firebase.database().ref("users/" + uid);
  dbRef.update({ gcm_sender_id: token });
};

const clearData = async (dispatch) => {
  dispatch({ type: CLEAR_DATA });
  disconnectChat();
  globals.loadedChatIds = [];
  getValue(gcmTokenName).then(() => {
    deleteValue(gcmTokenName);
  });
  history.push(LOGIN);
};

const setUser = (dispatch) => async (payload) => {
  dispatch({ type: SET_USER, payload });
};

const setChannel = (dispatch) => async (payload) => {
  dispatch({ type: SET_CHANNEL, payload });
};

const register = (dispatch) => async (email, username, password) => {
  try {
    dispatch({ type: LOADING, payload: true });
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    await user.updateProfile({ displayName: username });
    const userDecoded = user.toJSON();
    userDecoded.displayName = username;
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    dispatch({ type: SET_USER, payload: userDecoded });
    dispatch({ type: LOADING, payload: false });
    history.push(HOME);
    updateUserEntry(userDecoded);
  } catch (e) {
    dispatch({ type: ERROR, payload: e });
  }
};

const login = (dispatch) => async (email, password, save) => {
  try {
    dispatch({ type: LOADING, payload: true });
    if (email && password) {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await firebase
        .auth()
        .setPersistence(
          save
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION
        );
      history.push(HOME);
    } else {
      history.push(LOGIN);
    }
    dispatch({ type: LOADING, payload: false });
  } catch (e) {
    dispatch({ type: ERROR, payload: e });
  }
};

const logout = (dispatch) => async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    dispatch({ type: ERROR, payload: e });
  } finally {
    clearData(dispatch);
  }
};

export {
  register,
  login,
  logout,
  setUser,
  setChannel,
  getSearchUser,
  sendAddRequest,
};
