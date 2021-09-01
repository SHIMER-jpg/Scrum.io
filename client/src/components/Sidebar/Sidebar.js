import { RiHomeLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.item}>
        <NavLink to="/home">
          <RiHomeLine size={23} /> Home
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/configuration">
          <BsGear size={23} /> Configuration
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
