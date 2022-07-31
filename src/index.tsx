import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";

import App from "./App";
import "./index.css";
import History from "./components/History";
import Converter from "./components/Converter";

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
              <Route path="/converter" element={<Converter />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
