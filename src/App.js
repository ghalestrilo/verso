import "./App.css";
import React, { useEffect } from 'react'
import Session from "./pages/Session";

import { useReplState } from "./state/repl";
import { useSoundState } from "./state/sound";
import { useSettingsState } from "./state/settings";


function App() {
  const { processes } = useSettingsState()
  const { initialize: initializeRepl, close: closeRepl } = useReplState()
  const { initialize: initializeSound } = useSoundState()

  useEffect(() => {
    console.log(processes)
    initializeRepl(processes)
    initializeSound()
    return () => closeRepl()
  }, [initializeRepl, closeRepl, processes, initializeSound]);

  return <Session></Session>;
}

export default App;
