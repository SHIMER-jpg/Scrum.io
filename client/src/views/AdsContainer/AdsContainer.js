import React, {useState} from "react";
import {useSelector} from 'react-redux'
import {advertisements} from './dataTest'
import Advertisement from "../../components/Advertisement/Advertisement";
import CreateAdModal from "../../components/CreateAdModal/CreateAdModal";
import styles from './AdsContainer.module.css'

console.log(advertisements)
export default function AdsContainer (){
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className={styles.adsContainer}>
        {isModalOpen && (
        <CreateAdModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
        />
        )}
        <div className={styles.adsHeader}>
            <h2 className={styles.adTitle}>
                Advertisements
            </h2> 
            <button className='btn-primary' 
            onClick={() => setIsModalOpen(true)}>
                Create advertisement
            </button>
        </div>
        <div className={styles.ads}>
            {advertisements && advertisements.map( (ad) => (
                <Advertisement 
                    title={ad.title}
                    description={ad.description}
                    date={ad.date}
                />
            ))}
        </div>
        </div>
    )
};
