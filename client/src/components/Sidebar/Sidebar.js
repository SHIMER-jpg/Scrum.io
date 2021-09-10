import { RiHomeLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { CgCardDiamonds } from "react-icons/cg";
import { AiOutlineBarChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const userRole = useSelector(({ viewRouter }) => viewRouter.userRole);
  const projectId = useSelector(({ managerView }) => managerView.project._id);
  const {
    location: { pathname },
  } = useHistory();

  console.log(projectId)

  return (
    <nav className={styles.container}>
      <div className={styles.item}>
        <NavLink to="/home">
          <RiHomeLine size={23} /> Home
        </NavLink>
      </div>
      {userRole ? (
        userRole === "scrumMaster" ? (
          <div className={styles.item}>
            <NavLink to={`/project/${projectId}`}>
              <AiOutlineBarChart size={23} /> Overview
            </NavLink>
          </div>
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
            <CgCardDiamonds size={23} /> Poker Planning
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
