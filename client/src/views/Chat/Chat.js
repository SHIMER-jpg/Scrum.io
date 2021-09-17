import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  createMessage,
  getMessages,
  updateMessage,
} from "../../redux/Chat/actions";
import styles from "./Chat.module.css";
import { CgClose } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import useTimeAgo from "../../hooks/useTimeAgo";

export function Chat({ buttonOpen, setButtonOpen }) {
  const projectId = useSelector((state) => state.managerView.project._id);
  const userId = useSelector((state) => state.app.loggedUser._id);
  const chatMap = useSelector((state) => state.chatInfo.messages);
  const socket = useSelector((state) => state.app.socket);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");

  const container = useRef(null);

  var firstTime = true;

  useEffect(() => {
    if (projectId) {
      dispatch(getMessages(projectId));

      socket.on("newMessage", handleNewMessage);
    }

    return () => socket.off("newMessage", handleNewMessage);
  }, [projectId]);

  const handleNewMessage = (message) => {
    if (firstTime) {
      container.current.scrollTop = container.current.scrollHeight;
      firstTime = false;
    } else if (
      container.current.scrollTop + container.current.clientHeight ===
      container.current.scrollHeight
    ) {
      container.current.scrollTop = container.current.scrollHeight;
    }

    if (message.projectId === projectId && message.userId !== userId) {
      dispatch(updateMessage(message));
    }
  };

  function handleSubmit(e) {
    if (messages !== "") {
      e.preventDefault();
      dispatch(createMessage(userId, projectId, messages));
      setMessages("");
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatBox}>
        <div className={styles.header}>
          <label>Project Chat</label>
          <button onClick={() => setButtonOpen(!buttonOpen)}>
            <CgClose size={20} />
          </button>
        </div>
        <div ref={container} className={styles.container}>
          {chatMap !== undefined && chatMap.length !== 0
            ? chatMap.map((message, i) => {
                console.log(message, "hola soy el mensaje");
                return <Message message={message} userId={userId} key={i} />;
              })
            : []}
        </div>
        <div className={styles.typing}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              value={messages}
              placeholder="Write a message..."
              onChange={(e) => setMessages(e.target.value)}
            />
            <button type="submit ">
              {" "}
              <FaTelegramPlane size={26} />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Message({ message, userId }) {
  console.log(message, "holii");
  const timeAgo = useTimeAgo(new Date(message.createdAt), "short");

  return (
    <div className={styles.message}>
      <div className={userId === message.userId._id ? styles.me : styles.user}>
        {userId !== message.userId._id && <img src={message.userId.picture} />}
        <div className={styles.messageBox}>
          <div className={styles.info}>
            <p className={styles.name}>
              {" "}
              {userId !== message.userId._id &&
                message.userId.name.split(" ")[0]}{" "}
            </p>
            <p className={styles.time}> {timeAgo} </p>
          </div>
          <div className={styles.text}>
            <p className={styles.content}>{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
