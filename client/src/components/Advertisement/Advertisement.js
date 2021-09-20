import React from "react";
import {useDispatch} from 'react-redux'
import styles from './Advertisement.module.css';
import {MdDelete} from 'react-icons/md';
import {deleteAdvertisement} from '../../redux/NoteDetail/actions'

export default function Advertisement({title, description, date, id, role, color}) {

  const advertisementId = id;

  const dispatch = useDispatch();

  function handleOnClick(){
    dispatch(deleteAdvertisement(advertisementId))
  }
  
  return (
        <div className={color == 'Orange' ? styles.orange : 
        color == 'Lightblue' ? styles.lightBlue : color == 'Purple' ? styles.purple : 
        color == 'Green' ? styles.green : styles.pink}>
            { role === 'scrumMaster' ? 
              <div className={styles.icon}>
              <button onClick={() => handleOnClick()}>
                <MdDelete size={30}/>
              </button>
              </div> : null
            }
            <div className={styles.note}>
              <div className={styles.title}>{title}</div>
              <div className={styles.date}>{date.substring(0,10)}</div>
              <div className={styles.description}>{description}</div>
            </div>
          </div>          
  );
}