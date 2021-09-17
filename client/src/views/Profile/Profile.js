/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import axios from "axios";

import Loading from "../../components/Loading/Loading";
import { getUserInfo, setUser } from "../../redux/App/actions";
import Notification from "../Notification/Notification";

import styles from "./Profile.module.css";

const mapIcons = (icon, size) => {
  if (icon.name === "Linked In") return <AiFillLinkedin size={size} />;
  if (icon.name === "GitHub") return <AiFillGithub size={size} />;
  return null;
};

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("aboutMe");
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.app.loggedUser);
  const userInfo = useSelector((state) => state.app.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loggedUser && dispatch(getUserInfo(loggedUser._id, setIsLoading));
  }, [loggedUser]);

  return isLoading ? (
    <Loading isCentered={true} />
  ) : (
    <section className={styles.container}>
      <div className={styles.profile}>
        <header className={styles.header}></header>
        <div className={styles.data}>
          <section className={styles.profile}>
            <div className={styles.userInfo}>
              <img src={loggedUser.picture} alt={loggedUser.name} />
              <h2>{loggedUser.name}</h2>
              <p>{userInfo.role}</p>
              <div className={styles.socials}>
                {userInfo.socials?.map((social) => mapIcons(social, 30))}
              </div>
              <div className={styles.imgContainer}>
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=lamaolo"
                  alt=""
                />
              </div>
            </div>
          </section>
          <section className={styles.content}>
            <nav className={styles.nav}>
              <button
                onClick={() => setSelectedTab("aboutMe")}
                className={`${selectedTab === "aboutMe" && styles.active}`}
              >
                About me
              </button>
              <button
                onClick={() => setSelectedTab("stats")}
                className={`${selectedTab === "stats" && styles.active}`}
              >
                Stats
              </button>
              <button
                onClick={() => setSelectedTab("notifications")}
                className={`${
                  selectedTab === "notifications" && styles.active
                }`}
              >
                Notifications
              </button>
            </nav>
            <div className={styles.renderContent}>
              {selectedTab === "aboutMe" && <AboutMeTab />}
              {selectedTab === "stats" && <StatsTab />}
              {selectedTab === "notifications" && <Notification />}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

const AboutMeTab = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nihil
      laboriosam nam quae a tenetur facere voluptate illum sapiente? Mollitia,
      eaque impedit ab praesentium aliquam iste dolorum at voluptatum laborum?
    </p>
  );
};

const StatsTab = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        nihil laboriosam nam quae a tenetur facere voluptate illum sapiente?
        Mollitia, eaque impedit ab praesentium aliquam iste dolorum at
        voluptatum laborum?
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />
      </form>
    </>
  );
};

export default Profile;
