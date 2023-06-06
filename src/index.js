import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Firebase, { FirebaseContext } from "./components/Firebase";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { createStore } from "redux";
import cartReducer from "./reducers/cartReducer";

const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

