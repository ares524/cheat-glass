import navigation from "./navigation";
import layout from "./layout";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default combineReducers({
    layout,
    navigation,
  });
