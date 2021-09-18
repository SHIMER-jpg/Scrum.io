/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLinkedin, AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

import Loading from "../../components/Loading/Loading";
import { getUserInfo, getUserLanguages, editUserInfoFields } from "../../redux/App/actions";
import Notification from "../Notification/Notification";

import styles from "./Profile.module.css";

const mapIcons = (icon, size) => {
  if (icon.name === "Linked In")
    return (
      <a
        className={"unstyled-link"}
        href={icon.url}
        target="_blank"
        rel="noreferrer"
      >
        <AiFillLinkedin size={size} />
      </a>
    );
  if (icon.name === "GitHub")
    return (
      <a
        className={"unstyled-link"}
        href={icon.url}
        target="_blank"
        rel="noreferrer"
      >
        <AiFillGithub size={size} />
      </a>
    );

  return null;
};

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("aboutMe");
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.app.loggedUser);
  const userInfo = useSelector((state) => state.app.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedUser._id) {
      dispatch(getUserInfo(loggedUser._id, setIsLoading));
    }
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
              {selectedTab === "aboutMe" && userInfo._id && <AboutMeTab loggedUser={loggedUser} userInfo={userInfo} />}
              {selectedTab === "stats" && userInfo._id && <StatsTab userInfo={userInfo} />}
              {selectedTab === "notifications" && <Notification />}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

const AboutMeTab = ({ loggedUser, userInfo }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({
    description: false,
    location: false,
  });

  const [values, setValues] = useState({
    description: userInfo.description,
    location: userInfo.location,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleIsEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSetEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    dispatch(editUserInfoFields(loggedUser._id, values))

    userInfo.description = values.description;
    userInfo.location = values.location;
  };

  return (
    <div className={styles.description}>
      <div className={styles.descriptionField}>
        <div className={styles.descriptionHeader}>
          <h2>User description</h2>
          {isEditing.description ? (
            <button onClick={() => handleSetEdit("description")}>
              <BsCheck strokeWidth={1.5} />
            </button>
          ) : (
            <button onClick={() => handleIsEditing("description")}>
              <RiPencilFill />
            </button>
          )}
        </div>
        {isEditing.description ? (
          <input type="text" name="description" onChange={handleChange} value={values.description} />
        ) : (
          <p>{userInfo.description}</p>
        )}
      </div>
      <div className={styles.descriptionField}>
        <div className={styles.descriptionHeader}>
          <h2>Location</h2>
          {isEditing.location ? (
            <button onClick={() => handleSetEdit("location")}>
              <BsCheck strokeWidth={1.5} />
            </button>
          ) : (
            <button onClick={() => handleIsEditing("location")}>
              <RiPencilFill />
            </button>
          )}
        </div>
        <p>{userInfo.location}</p>
      </div>
    </div>
  );
};

const StatsTab = ({ userInfo }) => {
  const [username, setUsername] = useState("");
  const [languages, setLanguages] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserLanguages(username));
  };

  useEffect(() => {
    if (userInfo.languages) {
      // los ordeno, y tomo los primeros 3
      const topLanguages = userInfo.languages
        .sort((a, b) => (a.size < b.size ? 1 : -1))
        .slice(0, 4);

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
      console.log(selectedLanguages);
      setLanguages(selectedLanguages);
    }
  }, [userInfo]);

  return (
    <section className={styles.stats}>
      {!userInfo?.languages?.length ? (
        <form onSubmit={handleSubmit}>
          <div>
            <AiFillGithub size={24} />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Write your GitHub username..."
            required
            autoComplete="off"
          />
          <button type="submit">
            <AiOutlineSearch size={20} />
          </button>
        </form>
      ) : (
        <section className={styles.statsContainer}>
          <div className={styles.chartsContainer}>
            <p>Most used languages</p>
            <div className={styles.charts}>
              {languages.map((lang) => (
                <div className={styles.chart}>
                  <div key={lang.name} className={styles.languageBar}>
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

const UserStats = ({ languages }) => {
  return languages.map((lang) => <p>xD</p>);
};

export default Profile;
