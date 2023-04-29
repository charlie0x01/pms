import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bulma/css/bulma.min.css";

// provider and store
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Router>
  </React.StrictMode>
);
