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

const store = createStore(
  baseReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
