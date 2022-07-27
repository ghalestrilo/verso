import "./App.css";
import React, { useEffect } from 'react'
import Session from "./pages/Session";

import { useReplState } from "./state/repl";


function App() {
  const { initialize: initializeRepl, close: closeRepl } = useReplState()

  useEffect(() => {
    initializeRepl()
    return () => closeRepl()
  }, [initializeRepl, closeRepl]);

  return <Session></Session>;
}

export default App;
