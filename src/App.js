import "./App.css";
import React, { useEffect } from 'react'
import Session from "./pages/Session";

import { useReplState } from "./state/repl";
import { useSettingsState } from "./state/settings";


function App() {
  const { processes } = useSettingsState()
  const { initialize: initializeRepl, close: closeRepl } = useReplState()

  useEffect(() => {
    console.log(processes)
    initializeRepl(processes)
    return () => closeRepl()
  }, [initializeRepl, closeRepl, processes]);

  return <Session></Session>;
}

export default App;
