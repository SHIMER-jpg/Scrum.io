/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import {
  getAllNotificationsByUser,
  markOneNotificationAsReaded,
} from "../../redux/App/actions";
import { getTeamComp } from "../../redux/NoteDetail/actions";

import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./TeamComposition.module.css";

const TeamComposition = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const teamCompData = useSelector((state) => state.NotesReducer.teamComp);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getTeamComp("6144f7467a795d7bcfb8e405"));
  }, []);

  console.log(teamCompData, projectId);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Team Composition</h1>
      </header>
      <div className={styles.body}>
        {teamCompData.map((item) => {
          return <TeamCard userInfo={item.userInfo} user={item.user} />;
        })}
      </div>
    </div>
  );
};

export default TeamComposition;
