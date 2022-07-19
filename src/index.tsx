import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import App from "./App";
import History from "./components/History";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
