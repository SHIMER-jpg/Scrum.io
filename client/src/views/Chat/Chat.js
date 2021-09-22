/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMessage,
  getMessages,
  updateMessage,
  clearMessages,
  saveLength,
} from "../../redux/Chat/actions";
import styles from "./Chat.module.css";
import { CgClose } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import useTimeAgo from "../../hooks/useTimeAgo";

export function Chat({ buttonOpen, setButtonOpen, setAlert }) {
  const projectId = useSelector((state) => state.managerView.project._id);
  const userId = useSelector((state) => state.app.loggedUser._id);
  const chatMap = useSelector((state) => state.chatInfo.messages);
  const socket = useSelector((state) => state.app.socket);
  const chatLength = useSelector((state) => state.chatInfo.messageQuantity);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const container = useRef(null);

  useEffect(() => {
    if (buttonOpen) {
      dispatch(saveLength(chatMessages.length));
    }
  }, [buttonOpen]);

  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages(chatMap);
    } else if (chatLength.length !== chatMap.length) {
      if (!buttonOpen) {
        setAlert(true);
      } else {
        setAlert(false);
      }
    }
  }, [chatMap]);

  useEffect(() => {
    if (projectId) {
      dispatch(getMessages(projectId));
      socket.on("newMessage", handleNewMessage);
    }

    if (chatLength !== chatMap.length) {
      if (!buttonOpen) {
        setAlert(true);
      }
    }

    return () => {
      socket.off("newMessage", handleNewMessage);
      dispatch(clearMessages());
    };
  }, [projectId]);

  useEffect(() => {
    // Lucero:  La solucion: Cada vez que llegue mensaje nuevo mandarlo a abajo del todo de vuelta
    // El problema es que lo estabamos mandado bien abajo del todo, pero todavia el mensaje no habia llegado, entonces se mandaba a abajo del todo MENOS sin contar el nuevo msg.
    container.current.scrollTop = 500000;
  }, [chatMap]);

  useEffect(() => {
    setAlert(false);
  }, []);

  const handleNewMessage = (message) => {
    if (message.projectId === projectId && message.userId !== userId) {
      dispatch(updateMessage(message));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (messages !== "") {
      dispatch(createMessage(userId, projectId, messages));
      setMessages("");
      dispatch(saveLength(chatMessages.length));
    }
  }

  return (
    <div className={styles.chatBox}>
      <header className={styles.header}>
        <p>Project chat</p>
        <button onClick={() => setButtonOpen(!buttonOpen)}>
          <CgClose size={24} />
        </button>
      </header>
      <div ref={container} className={styles.messagesContainer}>
        {chatMap !== undefined && chatMap.length !== 0
          ? chatMap.map((message, i) => {
              return <Message message={message} userId={userId} key={i} />;
            })
          : []}
      </div>
      <form className={styles.typing} onSubmit={(e) => handleSubmit(e)}>
        <input
          value={messages}
          placeholder="Write a message..."
          onChange={(e) => setMessages(e.target.value)}
        />
        <button type="submit ">
          <FaTelegramPlane size={24} />
        </button>
      </form>
    </div>
  );
}

function Message({ message, userId }) {
  const timeAgo = useTimeAgo(new Date(message.createdAt), "narrow");

  return (
    <article
      className={`${styles.message} ${
        userId === message.userId._id && styles.mine
      }`}
    >
      {message.userId._id !== userId && (
        <img src={message.userId.picture} alt={message.userId.name} />
      )}
      <div className={styles.messageContent}>
        <div className={styles.contentDetails}>
          {message.userId._id !== userId ? (
            <p>{message.userId.name.split(" ")[0]}</p>
          ) : (
            <p></p> // para que no se rompan los estilos xd //gracias
          )}
          <p>{timeAgo}</p>
        </div>
        <p>{message.content.trim()}</p>
      </div>
    </article>
  );
}
