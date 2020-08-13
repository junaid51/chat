import {
  SET_USER,
  ERROR,
  CLEAR_DATA,
  LOADING,
  GET_CHAT,
  LOAD_MORE_CHAT,
  LOAD_MORE_LOADING,
} from "../constants";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_CHAT:
      const { key: a, value: b } = action.payload;
      return {
        ...state,
        loading: false,
        chatScroll: "down",
        chat: {
          ...state.chat,
          [a]: [...(state.chat[a] || []), ...b],
        },
      };
    case LOAD_MORE_CHAT:
      const { key: c, value: d } = action.payload;
      return {
        ...state,
        loadingMoreChat: false,
        chatScroll: "none",
        chat: {
          ...state.chat,
          [c]: [...d, ...(state.chat[c] || [])],
        },
      };
    case CLEAR_DATA:
      return {
        ...state,
        loading: false,
        error: "",
        user: null,
        chat: {},
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOAD_MORE_LOADING:
      return {
        ...state,
        loadingMoreChat: action.payload,
      };
    default:
      return state;
  }
}
