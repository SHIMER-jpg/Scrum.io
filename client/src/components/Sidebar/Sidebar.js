import { RiHomeLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { CgCardDiamonds } from "react-icons/cg";
import { HiViewBoards } from "react-icons/hi";
import { AiOutlineBarChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {BsFillExclamationCircleFill} from "react-icons/bs";

import styles from "./Sidebar.module.css";
import { SiGooglehangoutsmeet } from "react-icons/si";

const Sidebar = () => {
  const userRole = useSelector(({ viewRouter }) => viewRouter.userRole);
  const projectId = useSelector(({ managerView }) => managerView.project._id);

  return (
    <nav className={styles.container}>
      <div className={styles.item}>
        <NavLink to="/home">
          <RiHomeLine size={23} /> Home
        </NavLink>
      </div>
      {userRole ? (
        userRole === "scrumMaster" ? (
          <>
            <div className={styles.item}>
              <NavLink to={`/project/${projectId}`}>
                <HiViewBoards size={23} /> Overview
              </NavLink>
            </div>
            <div className={styles.item}>
              <NavLink to={`/advertisements/${projectId}`}>
                <BsFillExclamationCircleFill size={23} /> Advertisements
              </NavLink>
            </div>
            <div className={styles.item}>
              <NavLink to={`/statistics/${projectId}`}>
                <AiOutlineBarChart size={23} /> Statistics
              </NavLink>
            </div>
          </>
        ) : (
          <div className={styles.item}>
            <NavLink to={`/project/${projectId}`}>
              <FaTasks size={20} /> My tasks
            </NavLink>
          </div>
        )
      ) : null}
      {userRole && (
        <div className={styles.item}>
          <NavLink to={`/planning/${projectId}`}>
            <CgCardDiamonds size={23} /> Poker planning
          </NavLink>
        </div>
      )}
      {userRole && (
        <div className={styles.item}>
          <NavLink to={`/meeting/${projectId}`}>
            <SiGooglehangoutsmeet size={23} /> Live Meeting
          </NavLink>
        </div>
      )}
      <div className={styles.item}>
        <NavLink to="/configuration">
          <BsGear size={23} /> Configuration
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
