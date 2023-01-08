import "./App.css";
import React, { useEffect } from "react";
import Session from "./pages/Session";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme";
import { useShortcuts } from "./desktop/useShortcuts";
import { useReplState } from "./state/repl";
import { useSettingsState } from "./state/settings";

const useRepl = () => {
  const { processes } = useSettingsState();
  const { bootProcesses: bootRepl, close: closeRepl } = useReplState();
  useEffect(() => {
    console.log(processes);
    bootRepl(processes);
    return () => closeRepl();
  }, [bootRepl, closeRepl, processes]);
};

function App() {
  useShortcuts();
  useRepl();

  return (
    <ChakraProvider theme={theme}>
      <Session />
    </ChakraProvider>
  );
}

export default App;
