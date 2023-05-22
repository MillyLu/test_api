import "./App.css";
import { AppRoutes } from "./routes";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("token");
  const[id, setId] = useState('');
  const[apiToken, setApiToken] = useState('');

  return (
    <>
    <div className="main">
      <AppRoutes user={token} id={id} setId={setId} apiToken={apiToken} setApiToken={setApiToken}/>
    </div>
      
    </>
  );
}

export default App;
