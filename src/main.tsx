import { App } from "components";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { theme } from "theme";
import { store } from "state";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
);
