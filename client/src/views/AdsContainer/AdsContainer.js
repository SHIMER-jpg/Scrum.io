/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Advertisement from "../../components/Advertisement/Advertisement";
import CreateAdModal from "../../components/CreateAdModal/CreateAdModal";
import styles from "./AdsContainer.module.css";
import Loading from "../../components/Loading/Loading";

import {
  getAdvertisementsByProjectId,
  clearAdvertisements,
} from "../../redux/NoteDetail/actions";

export default function AdsContainer(props) {
  const userRole = useSelector((state) => state.viewRouter.userRole);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const advertisements = useSelector(
    (state) => state.NotesReducer.advertisements
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getAdvertisementsByProjectId(props.match.params.projectId, setIsLoading)
    );

    return () => {
      dispatch(clearAdvertisements());
    };
  }, []);

  // useEffect(() => {
  //   setAds(advertisements);
  // }, [advertisements]);

  /**
   * advertisements.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      })
   */
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
        <h1 className="main-heading">Advertisements</h1>
        {userRole === "scrumMaster" ? (
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            Create advertisement
          </button>
        ) : null}
      </header>
      {isLoading ? (
        <Loading />
      ) : advertisements.length > 0 ? (
        <div className={styles.ads}>
          {advertisements
            .sort(function (a, b) {
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              if (a.createdAt > b.createdAt) {
                return -1;
              }
              return 0;
            })
            .map((ad) => (
              <Advertisement
                key={ad._id}
                title={ad.title}
                description={ad.description}
                createdAt={ad.createdAt}
                id={ad._id}
                color={ad.color}
                role={userRole}
              />
            ))}
        </div>
      ) : (
        <div className={styles.noAds}>
          <h2 style={{fontWeight: "500"}}>There are no advertisements yet.</h2>
        </div>
      )}
    </div>
  );
}
