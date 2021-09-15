import React, {useState} from "react";
import {useSelector} from 'react-redux'
import {advertisements} from './dataTest'
import Advertisement from "../../components/Advertisement/Advertisement";
import CreateAdModal from "../../components/CreateAdModal/CreateAdModal";
import styles from './AdsContainer.module.css'

export default function AdsContainer (){

    const [isModalOpen, setIsModalOpen] = useState(false)
    // const info = useSelector((state) => state.ManagerView)
    //const arrayAds = info.sort((function (a, b) {
    //   if (a.date> b.date) {
    //     return 1;
    //   }
    //   if (a.date < b.date) {
    //     return -1;
    //   }
    //   return 0;
    // }))

    const arrayAds = advertisements.sort(function (a, b) {
        if (a.date < b.date) {
        return 1;
        }
        if (a.date > b.date) {
        return -1;
        }
        return 0;
    }) 

    return (
        <div className={styles.adsContainer}>
        {isModalOpen && (
        <CreateAdModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
        />
        )}
        <header className={styles.adsHeader}>
            <h1 className="main-heading">
                Advertisements
            </h1> 
            <button className='btn-primary' 
            onClick={() => setIsModalOpen(true)}>
                Create advertisement
            </button>
        </header>
        <div className={styles.ads}>
            {arrayAds && arrayAds.map( (ad) => (
                <Advertisement 
                    title={ad.title}
                    description={ad.description}
                    date={ad.date}
                />
            ))}
            {/* {arrayAds && arrayAds.map( (ad) => (
                <Advertisement 
                    title={ad.title}
                    description={ad.description}
                    date={ad.date}
                />
            ))} */}
        </div>
        </div>
    )
};
