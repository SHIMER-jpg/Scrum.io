import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Advertisement from "../../components/Advertisement/Advertisement";
import CreateAdModal from "../../components/CreateAdModal/CreateAdModal";
import styles from './AdsContainer.module.css'

import { getAdvertisementsByProjectId } from "../../redux/NoteDetail/actions";

export default function AdsContainer (props){

    const userRole = useSelector((state) => state.viewRouter.userRole)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const advertisements = useSelector((state) => state.NotesReducer.advertisements)

    const arrayAds = advertisements.sort((function (a, b) {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    }))

    useEffect(() => {
        dispatch(getAdvertisementsByProjectId(props.match.params.projectId))
    }, [])

    return (
        <div className={styles.adsContainer}>
            {isModalOpen && (
            <CreateAdModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                projectId={props.match.params.projectId}
            />
            )}
            <header className={styles.adsHeader}>
                <h1 className="main-heading">
                    Advertisements
                </h1> 
                { userRole === 'scrumMaster' ?
                <button className='btn-primary' 
                onClick={() => setIsModalOpen(true)}>
                    Create advertisement
                </button> : <div></div>
                }
            </header>
            <div className={styles.ads}>
                {arrayAds.length > 0 ? arrayAds.map( (ad) => (
                    <Advertisement 
                        title={ad.title}
                        description={ad.description}
                        date={ad.date.substring(0,10)}
                    />
                )): <div className={styles.noAds}>
                    <h1>There's no advertisements</h1>
                    {userRole === "scrumMaster" ? (<h1>create a new one!</h1>) : null}
                    </div>
                }
            </div>
        </div>
    )
};
