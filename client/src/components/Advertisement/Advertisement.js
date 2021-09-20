import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Advertisement.module.css";

import useTimeAgo from "../../hooks/useTimeAgo";

import { deleteAdvertisement } from "../../redux/NoteDetail/actions";
import { IoClose } from "react-icons/io5";

export default function Advertisement({
  title,
  description,
  date,
  id,
  role,
  color,
}) {
  const advertisementId = id;
  const dispatch = useDispatch();
  const dateTimeAgo = useTimeAgo(new Date(date));
  const [colorNote] = useState(
    color == "Orange"
      ? styles.orange
      : color == "Lightblue"
      ? styles.lightBlue
      : color == "Purple"
      ? styles.purple
      : color == "Green"
      ? styles.green
      : styles.pink
  );

  const roleBoolean = role === "scrumMaster";

  function handleOnClick() {
    dispatch(deleteAdvertisement(advertisementId));
  }

  return (
    <div
      className={
        color == "Orange"
          ? styles.orange
          : color == "Lightblue"
          ? styles.lightBlue
          : color == "Purple"
          ? styles.purple
          : color == "Green"
          ? styles.green
          : styles.pink
      }
    >
      <div className={`${styles.note} ${colorNote}`}>
        {role === "scrumMaster" ? (
          <div className={styles.icon}>
            <button onClick={() => handleOnClick()}>
              <IoClose size={30} />
            </button>
          </div>
        ) : null}
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.date}>
          <p>{dateTimeAgo}</p>
        </div>
        {/* <div className={styles.date}>{date.substring(0, 10)}</div> */}
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
