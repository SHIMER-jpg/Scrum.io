import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCardStats } from "../../redux/TeamComposition/actions";
import Loading from "../Loading/Loading";
import { motion, useCycle } from "framer-motion";

import styles from "./TeamCard.module.css";

const TeamCard = ({ userInfo, user }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [animate, cycle] = useCycle(
    { display: "none", opacity: "0", marginLeft: "0px", height: "0px" },
    { display: "block", opacity: "1", marginLeft: "30px", height: "420px" }
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
              {/* <div className={styles.imgContainer}>
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=lamaolo"
                  alt=""
                />
              </div> */}
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
            <div className={styles.softSkillsContainer}>
              <p>Soft Skills</p>
              <ul className={styles.softSkills}>
                {userInfo.softSkills.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={styles.performance}>
            <div className={styles.performanceItem}>
              <p>Projects worked</p>
              <p>{userInfo.projectsWorked}</p>
            </div>
            <div className={styles.performanceItem}>
              <p>Rating</p>
              <p>{userInfo.rating}</p>
            </div>
            <div className={styles.performanceItem}>
              <p>Total story points</p>
              <p>{userInfo.totalStoryPoints}</p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default TeamCard;

/*
background: "<svg xmlns='http://www.w3.org/2000/svg'  width='489' height='58.7' viewBox='0 0 1000 120'><rect fill='#000000' width='1000' height='120'/><g  fill='none' stroke='#222' stroke-width='4.5' stroke-opacity='1'><path d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/></g></svg>"
description: "Lorem ipsum etc etcetc etcetc etcetc etcetc etcetc etcetc etcetc etcetc etc"
languageOne: "JavaScript"
languageThree: "HTML"
languageTwo: "CSS"
location: "Río Negro, Argentina"
projectsWorked: 10
quote: "Si tuviera mas tiempo..."
rating: 10
role: "Frontend developer"
socials: (2) [{…}, {…}]
softSkills: (3) ["Leadership", "Team Work", "Design"]
totalStoryPoints: "782"
userId: "61326ee7757f3e2669dd4704"
__v: 0
_id: "61436723e1574c48ca0a25f9"
[[Prototype]]: Object
 
{_id: "61326ee7757f3e2669dd4704", providerId: "google-oauth2|116075231960085539883", picture: "https://lh3.googleusercontent.com/a/AATXAJz0h56xgZgqbZK6EkSlXxngx9FM3wDnogscVz20=s96-c", username: "lamaolo.m", email: "lamaolo.m@gmail.com", …}
email: "lamaolo.m@gmail.com"
name: "Lucero Amaolo"
picture: "https://lh3.googleusercontent.com/a/AATXAJz0h56xgZgqbZK6EkSlXxngx9FM3wDnogscVz20=s96-c"
providerId: "google-oauth2|116075231960085539883"
username: "lamaolo.m"
__v: 0
_id: "61326ee7757f3e2669 */
