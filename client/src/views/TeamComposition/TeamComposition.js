/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";

import { getTeamComp } from "../../redux/TeamComposition/actions";

import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./TeamComposition.module.css";

const TeamComposition = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const teamCompData = useSelector((state) => state.teamCompReducer.teamComp);
  const userRole = useSelector((state) => state.viewRouter.userRole);

  useEffect(() => {
    dispatch(getTeamComp(projectId));
  }, []);

  if(!userRole) {
    return <Redirect to={`/project/${projectId}`} />
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Team Composition</h1>
      </header>
      <div className={styles.body}>
        {teamCompData.map((item) => {
          return <TeamCard key={item.user._id} userInfo={item.userInfo} user={item.user} />;
        })}
      </div>
    </div>
  );
};

export default TeamComposition;
