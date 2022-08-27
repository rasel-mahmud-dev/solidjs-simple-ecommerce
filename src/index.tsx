/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";


import App from "./App";

import { AppProvider } from "./store";

import "./App.css";
import "./index.css";

render(
  () => (
    <Router >
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
