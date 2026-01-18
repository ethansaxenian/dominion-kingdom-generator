import { App } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/state";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
