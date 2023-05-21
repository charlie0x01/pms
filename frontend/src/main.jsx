import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import { ConfigProvider } from "react-avatar";

// provider and store
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ConfigProvider
          colors={[
            "hsl(171, 100%, 41%)",
            "hsl(217, 71%, 53%)",
            "hsl(204, 86%, 53%)",
            "hsl(348, 100%, 61%)",
            "hsl(48, 100%, 67%)",
          ]}
        >
          <AppRoutes />
        </ConfigProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
