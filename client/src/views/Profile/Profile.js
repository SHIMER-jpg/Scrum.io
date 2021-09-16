/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { getUserInfo } from "../../redux/App/actions";

import styles from "./Profile.module.css";

const mapTypeToText = {
  assignedTask: "You have a new task assigned",
};

const Profile = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.app.loggedUser);
  const userInfo = useSelector((state) => state.app.userInfo);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loggedUser && dispatch(getUserInfo(loggedUser._id));
    const BackGroundContainer = document.getElementById("BackGroundContainer");
    BackGroundContainer.innerHTML = userInfo.background;
  }, [loggedUser]);

  return (
    <div id="BackGroundContainer">
      <div></div>
    </div>
  );
};

export default Profile;
