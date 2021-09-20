/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

import Loading from "../../components/Loading/Loading";
import Notification from "../Notification/Notification";
import {
  getUserInfo,
  getUserLanguages,
  editUserInfoFields,
} from "../../redux/App/actions";

import styles from "./Profile.module.css";

const Profile = ({ location }) => {
  const [selectedTab, setSelectedTab] = useState(
    location?.state?.redirectSelectedTab || "aboutMe"
  );
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.app.loggedUser);
  const userInfo = useSelector((state) => state.app.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedUser && loggedUser._id) {
      dispatch(getUserInfo(loggedUser._id, setIsLoading));
    }
  }, [loggedUser]);

  useEffect(() => {
    if (location?.state?.redirectSelectedTab) {
      setSelectedTab(location.state.redirectSelectedTab);
    }
  }, [location]);

  const handleEditSubmit = (e, values) => {
    e.preventDefault();
    console.log(values)

    dispatch(editUserInfoFields(loggedUser._id, values));
    setSelectedTab("aboutMe");

    userInfo.description = values.description;
    userInfo.location = values.location;
    userInfo.github = values.github;
    userInfo.linkedin = values.linkedin;
    userInfo.softSkills = values.softSkills;
    userInfo.role = values.role;
  };

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
              <p>{userInfo?.role || "No role"}</p>
              <div className={styles.socials}>
                {userInfo.linkedin && (
                  <a
                    className={"unstyled-link"}
                    href={userInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillLinkedin size={27} />
                  </a>
                )}
                {userInfo.github && (
                  <a
                    className={"unstyled-link"}
                    href={`https://github.com/${userInfo.github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillGithub size={27} />
                  </a>
                )}
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
              <button
                onClick={() => setSelectedTab("editProfile")}
                className={`${selectedTab === "editProfile" && styles.active}`}
              >
                Edit profile
              </button>
            </nav>
            <div className={styles.renderContent}>
              {selectedTab === "aboutMe" && userInfo._id && (
                <AboutMeTab loggedUser={loggedUser} userInfo={userInfo} />
              )}
              {selectedTab === "stats" && userInfo._id && (
                <StatsTab userInfo={userInfo} />
              )}
              {selectedTab === "notifications" && userInfo._id && (
                <Notification />
              )}
              {selectedTab === "editProfile" && userInfo._id && (
                <EditProfile
                  handleSubmit={handleEditSubmit}
                  loggedUser={loggedUser}
                  userInfo={userInfo}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

const AboutMeTab = ({ userInfo }) => {
  return (
    <div className={styles.description}>
      <div className={styles.descriptionField}>
        <div className={styles.descriptionHeader}>
          <h2>User description</h2>
        </div>
        <p>{userInfo.description || "No description provided."}</p>
      </div>
      <div className={styles.descriptionField}>
        <div className={styles.descriptionHeader}>
          <h2>Location</h2>
        </div>
        <p>{userInfo.location || "No location provided."}</p>
      </div>
      <div className={styles.descriptionField}>
        <div className={styles.descriptionHeader}>
          <h2>Soft skills</h2>
        </div>
        <div className={styles.softSkillsList}>
          {!userInfo.softSkills.length ? (
            <p>No soft skills provided.</p>
          ) : (
            <ul>
              {userInfo.softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const EditProfile = ({ loggedUser, userInfo, handleSubmit }) => {
  const [values, setValues] = useState({
    role: userInfo.role || "",
    github: userInfo.github || "",
    linkedin: userInfo.linkedin || "",
    description: userInfo.description || "",
    location: userInfo.location || "",
    softSkills: userInfo.softSkills || [],
  });
  const [softSkill, setSoftSkill] = useState("");

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    if (values.hasOwnProperty(e.target.name)) {
      userInfo[e.target.name] = e.target.value;
    }
  };

  const handleAddSoftSkill = () => {
    if (softSkill && !values.softSkills.includes(softSkill)) {
      setValues({
        ...values,
        softSkills: [...values.softSkills, softSkill],
      });

      setSoftSkill("");
    }
  };

  const handleRemoveSoftSkill = (ss) => {
    setValues({
      ...values,
      softSkills: values.softSkills.filter((e) => e !== ss),
    });
  };

  return (
    <section className={styles.editProfile}>
      <h2>Edit profile</h2>
      <form
        className={styles.editProfileForm}
        onSubmit={(e) => handleSubmit(e, values)}
      >
        <section className={styles.editProfileInfo}>
          <div className={styles.modalFormGroup}>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              autoComplete="off"
              placeholder="Write your role here..."
              value={values.role}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Write your description here..."
              value={values.description}
              onChange={handleChange}
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div className={styles.modalFormGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              autoComplete="off"
              placeholder="Write your location here..."
              value={values.location}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.modalFormGroup} ${styles.addSoftSkill}`}>
            <label htmlFor="softskill">Soft skills</label>
            <div>
              <input
                type="text"
                id="softskill"
                name="softskill"
                autoComplete="off"
                placeholder="Write a soft skill"
                onChange={(e) => setSoftSkill(e.target.value)}
                value={softSkill}
              />
              <button onClick={handleAddSoftSkill} type="button">
                +
              </button>
            </div>
          </div>
          <div className={`${styles.modalFormGroup} ${styles.softSkills}`}>
            {values.softSkills.map((s) => (
              <p key={s} onClick={() => handleRemoveSoftSkill(s)}>
                {s} | <b>X</b>
              </p>
            ))}
          </div>
          <button type="submit">Save changes</button>
        </section>
        <section className={styles.editProfileSocials}>
          <div className={styles.editProfileSocialsFormGroup}>
            <label htmlFor="github">GitHub user</label>
            <div className={styles.editProfileSocialInput}>
              <AiFillGithub size={21} />
              <input
                type="text"
                value={values.github}
                onChange={handleChange}
                name="github"
                placeholder="Write your GitHub username..."
                autoComplete="off"
              />
            </div>
          </div>
          <div className={styles.editProfileSocialsFormGroup}>
            <label htmlFor="github">LinkedIn profile</label>
            <div className={styles.editProfileSocialInput}>
              <AiFillLinkedin size={21} />
              <input
                type="text"
                value={values.linkedin}
                onChange={handleChange}
                name="linkedin"
                placeholder="Paste the URL of your LinkedIn profile"
                autoComplete="off"
              />
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

const StatsTab = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userInfo?.github &&
      dispatch(getUserLanguages(userInfo.github, setIsLoading));
  }, []);

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

      setLanguages(selectedLanguages);
    }
  }, [userInfo]);

  return (
    <section className={styles.stats}>
      {!userInfo?.languages?.length ? (
        isLoading ? (
          <Loading />
        ) : (
          <p>Write your GitHub username to see your stats</p>
        )
      ) : (
        <section className={styles.statsContainer}>
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

export default Profile;
