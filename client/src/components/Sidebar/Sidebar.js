import { RiHomeLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiViewBoards } from "react-icons/hi";
import { AiOutlineBarChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const userRole = useSelector(({ viewRouter }) => viewRouter.userRole);
  const {
    location: { pathname },
  } = useHistory();

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
              <NavLink to={pathname}>
                <HiViewBoards size={23} /> Overview
              </NavLink>
            </div>
            <div className={styles.item}>
              <NavLink to={`${pathname}/statistics`}>
                <AiOutlineBarChart size={23} /> Statistics
              </NavLink>
            </div>
          </>
        ) : (
          <div className={styles.item}>
            <NavLink to={pathname}>
              <FaTasks size={20} /> My tasks
            </NavLink>
          </div>
        )
      ) : null}
      <div className={styles.item}>
        <NavLink to="/configuration">
          <BsGear size={23} /> Configuration
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
