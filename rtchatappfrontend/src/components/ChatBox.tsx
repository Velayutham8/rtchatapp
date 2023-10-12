import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import { toast } from "react-toastify";

const ChatBox = ({ user, onReset, onError, socket }: any) => {
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [chatInput, setChatInput] = useState<string>("");

  //If only connection is true we can send messages to server
  const [connection, setConnection] = useState<boolean>(false);

  useEffect(() => {
    socket.addEventListener("open", (event: any) => {
      setConnection(true);
      toast.success("Connected to server");
      socket.send(JSON.stringify({ clientid: user }));
    });
  }, []);

  useEffect(() => {
    // Listen for messages
    socket.addEventListener("message", (event: any) => {
      const { clientid, message } = JSON.parse(event.data);

      setMessageList((prev) => [
        ...prev,
        {
          // clientid: user === clientid ? "You" : clientid,
          clientid: clientid,
          message,
          sentdate: new Date(),
        },
      ]);
    });
  }, []);

  useEffect(() => {
    socket.addEventListener("error", (event: any) => {
      setConnection(false);
      onReset();
      onError("Something went wrong on server");
    });
  }, []);

  useEffect(() => {
    return () => {
      if (connection) {
        socket.send(JSON.stringify({ clientid: user, request: "DELETE" }));
      }
    };
  }, []);

  const onSend = (e: any) => {
    e.preventDefault();
    if (!chatInput) {
      return;
    }

    const data = {
      clientid: user,
      message: chatInput,
    };
    if (connection) {
      socket.send(JSON.stringify(data));
      setChatInput("");
    }
  };

  const onChangeHandler = ({ target: { value } }: any) => {
    setChatInput(value);
  };

  return (
    <div id="wrapper">
      <div id="menu">
        <p className="welcome" style={{ color: "black" }}>
          Welcome <b></b>
        </p>
      </div>
      <div id="chatbox">
        <ChatList messageList={messageList} />
      </div>
      <form name="message">
        <input
          name="usermsg"
          type="text"
          id="usermsg"
          value={chatInput}
          onChange={onChangeHandler}
        />
        <input
          name="submitmsg"
          type="submit"
          id="submitmsg"
          value="Send"
          onClick={onSend}
        />
      </form>
    </div>
  );
};

export default ChatBox;
