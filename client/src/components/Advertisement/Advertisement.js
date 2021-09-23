import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Advertisement.module.css";

import useTimeAgo from "../../hooks/useTimeAgo";

import { deleteAdvertisement } from "../../redux/NoteDetail/actions";
import { IoClose } from "react-icons/io5";

export default function Advertisement({
  title,
  description,
  createdAt,
  id,
  role,
  color,
}) {
  const advertisementId = id;
  const dispatch = useDispatch();
  const dateTimeAgo = useTimeAgo(new Date(createdAt));

  function handleOnClick() {
    dispatch(deleteAdvertisement(advertisementId));
  }

  return (
    <div>
      <div className={`${styles.note} ${styles[color?.toLowerCase()]}`}>
        <header>
          <h3>{title}</h3>
          {role === "scrumMaster" ? (
            <div className={styles.icon}>
              <button onClick={() => handleOnClick()}>
                <IoClose size={26} />
              </button>
            </div>
          ) : null}
        </header>
        <div className={styles.date}>
          <p>{dateTimeAgo}</p>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
