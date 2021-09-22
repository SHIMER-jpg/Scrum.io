/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCardStats } from "../../redux/TeamComposition/actions";
import Loading from "../Loading/Loading";
import { motion, useCycle } from "framer-motion";

import styles from "./TeamCard.module.css";

const TeamCard = ({ userInfo, user }) => {
  const [animate, cycle] = useCycle(
    { display: "none", opacity: 0, marginLeft: "0px", height: "0px" },
    { display: "block", opacity: 1, marginLeft: "30px", height: "420px" }
  );

  return (
    <div className={styles.cardAndDetails}>
      <motion.button
        whileTap={{ scale: 1.05 }}
        onClick={() => cycle()}
        className={styles.cardButton}
      >
        <section className={styles.container}>
          <header className={styles.header}></header>
          <section className={styles.profile}>
            <div className={styles.userInfo}>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{userInfo.role}</p>
            </div>
          </section>
        </section>
      </motion.button>

      <motion.section
        animate={animate}
        transition={{ ease: "easeOut", duration: 0.12 }}
      >
        <div className={styles.detailContainer}>
          <StatsTab userInfo={userInfo} />
        </div>
      </motion.section>
    </div>
  );
};

const StatsTab = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userInfo?.github && dispatch(getCardStats(userInfo.github, setIsLoading));
  }, []);

  useEffect(() => {
    if (userInfo.languages) {
      // los ordeno, y tomo los primeros 3
      const topLanguages = userInfo.languages
        .sort((a, b) => (a.size < b.size ? 1 : -1))
        .slice(0, 3);

      const totalSize = topLanguages.reduce(
        (acc, current) => (acc += current.size),
        0
      );

      const selectedLanguages = [];

      topLanguages.forEach((lang) => {
        selectedLanguages.push({
          name: lang.language,
          size: ((lang.size * 100) / totalSize).toFixed(1),
          color: lang.color,
        });
      });
      setLanguages(selectedLanguages);
    }
  }, [userInfo]);

  return (
    <section className={styles.stats}>
      {!userInfo?.languages?.length ? (
        isLoading ? (
          <div id={styles.userNameError}>
            <p>No GITHUB username provided</p>
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <section className={styles.statsContainer}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className={styles.chartsContainer}>
              <p>Most used languages</p>
              <div className={styles.charts}>
                {languages.map((lang) => (
                  <div key={lang.name} className={styles.chart}>
                    <div className={styles.languageBar}>
                      <div
                        style={{
                          height: lang.size + "%",
                          width: "100%",
                          background: lang.color,
                        }}
                      ></div>
                    </div>
                    <div className={styles.langStats}>
                      <p>{lang.name}</p>
                      <p>{lang.size}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.performance}>
              <div className={styles.performanceItem}>
                <p>Projects worked</p>
                <p>{userInfo.projectsWorked}</p>
              </div>
              <div className={styles.performanceItem}>
                <p>Rating</p>
                <p>{userInfo.rating || 5}</p>
              </div>
              <div className={styles.performanceItem}>
                <p>Total story points</p>
                <p>{userInfo.totalStoryPoints}</p>
              </div>
            </div>
          </div>
          <div className={styles.softSkillsContainer}>
            <p>Soft Skills</p>
            <ul className={styles.softSkills}>
              {userInfo.softSkills.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        </section>
      )}
    </section>
  );
};

export default TeamCard;
