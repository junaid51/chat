import { createStore } from "redux";
import baseReducer from "./reducers/baseReducer";

const initialState = {
  user: null,
  chat: {},
  generalChat: [],
  loading: false,
  loadingMoreChat: false,
  chatScroll: "down",
  selectedChannel: "",
};

const store = createStore(baseReducer, initialState);

export default store;
