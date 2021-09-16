import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  createMessage,
  getMessages,
  updateMessage,
} from "../../redux/Chat/actions";
import styles from "./Chat.module.css";
import { CgClose } from "react-icons/cg";

export function Chat({buttonOpen, setButtonOpen}) {
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

  function calculateTime(time) {
    time = moment(time);
    var now = moment().subtract(4, "hours");
    if(now.diff(time, "days") >= 1){
      return now.diff(time, "days") + " days ago";
    }
    if(now.diff(time, "hours") >= 1){
      return now.diff(time, "hours") + " hours ago";
    }
    if(now.diff(time, "minutes") >= 1){
      return now.diff(time, "minutes") + " minutes ago";
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <label>Project Chat</label>
        <button onClick={() => setButtonOpen(!buttonOpen)}><CgClose size={20}/></button>
      </div>
      <div className={styles.container}>
        {chatMap !== undefined && chatMap.length !== 0
          ? chatMap.map((message, i) => {
              console.log(message, "hola soy el mensaje");
              return (
                <div key={i} className={styles.message}>
                  <div className={styles.user}>
                    <img src={message.userId.picture} />
                    <div className={styles.text}>
                      <div className={styles.info}>
                        <p className={styles.name}> {message.userId.name.split(" ")[0]} </p>
                        <p className={styles.time}> {calculateTime(message.timeStamp)} </p>
                      </div>
                      <p className={styles.content}>{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : []}
      </div>
      <div className={styles.typing}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => setMessages(e.target.value)} />
          <button type="submit ">Send</button>
        </form>
      </div>
    </div>
  );
}
