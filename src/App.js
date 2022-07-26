import "./App.css";
import React, { useState, useEffect, useRef } from 'react'
import Session from "./pages/Session";

const webSocketServer = "ws://localhost:8080"

function App() {
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket();
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log("e", message);
    };
  }, [isPaused]);

  return <Session></Session>;
}

export default App;
