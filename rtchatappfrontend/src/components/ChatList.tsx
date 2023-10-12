//List of Chats
const ChatList = ({ messageList }: { messageList: Array<any> }) => {
  return (
    <ul>
      {messageList &&
        messageList.length > 0 &&
        messageList.map((el: any, index: number) => {
          return (
            <li key={index}>
              <p className="chatbox-list-text">
                <span>{el.sentdate.toLocaleString()} - </span>
                {el.clientid} : {el.message}
              </p>
            </li>
          );
        })}
    </ul>
  );
};

export default ChatList;
