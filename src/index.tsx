/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { AppProvider } from "./store";

render(
  () => (
    <Router base="solidjs-simple-ecommerce">
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
