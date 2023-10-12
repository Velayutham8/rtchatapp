import "./App.css";
import ChatBox from "./components/ChatBox";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState<string>("");
  const [userNameExist, setUserNameExist] = useState<boolean>(false);

  //Initialize the websocket connection to server local ip and port
  const socket = new WebSocket("ws://localhost:8080");

  const onUserInputHandle = ({ target: { value } }: any) => {
    setUser(value);
  };

  const onSet = () => {
    if (!user) {
      return;
    }

    setUserNameExist(true);
  };

  const onReset = () => {
    setUserNameExist(false);
    setUser("");
  };

  const onError = (message: string) => {
    toast.error(message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-text">Chat App</h1>
        {!userNameExist && (
          <div>
            <input
              className="user-input"
              value={user}
              onChange={onUserInputHandle}
            />
            <button onClick={onSet} className="set-btn">
              Set UserName
            </button>
          </div>
        )}
        {userNameExist && (
          <button onClick={onReset} className="reset-btn">
            Reset
          </button>
        )}

        <h2>{userNameExist && user}</h2>
        {userNameExist && (
          <ChatBox
            user={user}
            onReset={onReset}
            onError={onError}
            socket={socket}
          />
        )}
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </header>
    </div>
  );
}

export default App;
