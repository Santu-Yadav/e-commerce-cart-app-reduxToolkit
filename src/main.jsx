import React from "react";

import { store } from "./reduxStore/store.js";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
// import App01 from "./poc/app01";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    {/* <App01 /> */}
  </Provider>
);
