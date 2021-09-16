import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMessage,
  getMessages,
  updateMessage,
} from "../../redux/Chat/actions";
import styles from "./Chat.module.css";

export function Chat() {
  const projectId = useSelector((state) => state.managerView.project._id);
  const userId = useSelector((state) => state.app.loggedUser._id);
  const chatMap = useSelector((state) => state.chatInfo.messages);
  const socket = useSelector((state) => state.app.socket);
  console.log(projectId);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (projectId) {
      dispatch(getMessages(projectId));

      socket.on("newMessage", handleNewMessage);
    }

    return () => socket.off("newMessage", handleNewMessage);
  }, [projectId]);

  const handleNewMessage = (message) => {
    console.log(message);
    if (message.projectId === projectId && message.userId !== userId) {
      dispatch(updateMessage(message));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createMessage(userId, projectId, messages));
  }

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        {chatMap !== undefined && chatMap.length !== 0
          ? chatMap.map((message, i) => {
              console.log(message, "hola soy el mensaje");
              return (
                <div key={i} className={styles.message}>
                  <div className={styles.user}>
                    <img src={message.userId.picture} />
                    <p> {message.userId.name.split(" ")[0]} </p>
                  </div>
                  <p className={styles.content}>{message.content}</p>
                </div>
              );
            })
          : []}
        <div className={styles.tiping}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => setMessages(e.target.value)} />
            <button type="submit ">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
