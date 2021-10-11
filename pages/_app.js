import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import axios from "axios";
import createRootReducer from "redux/reducers";
import config from "constants/config";
import Header from "components/front/Header";
import "styles/theme.scss";
import { useRouter } from "next/router";
import { Container } from "reactstrap";

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = typeof window !== "undefined" && localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const store = createStore(
  createRootReducer,
  compose(applyMiddleware(ReduxThunk))
);

function MyApp({ Component, pageProps, sidebarStatic }) {
  const router = useRouter();
  React.useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  });
  return (
    <Provider store={store}>
        <>
          <Header />
          <Component {...pageProps} />
        </>
    </Provider>
  );
}

export default MyApp;
