import { useContext, useState } from "react";
import styles from "./TeamCard.module.css";
import { motion, useCycle } from "framer-motion";

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
              <div className={styles.imgContainer}>
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=lamaolo"
                  alt=""
                />
              </div>
            </div>
          </section>
        </section>
      </motion.button>

      <motion.section
        animate={animate}
        transition={{ ease: "easeIn", duration: 0.12 }}
      >
        <div className={styles.detailContainer}></div>
      </motion.section>
    </div>
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
