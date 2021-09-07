import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Line} from 'react-chartjs-2'
import styles from "./StatisticCard.module.css";

export default function StatisticCard({ graphType }) {

  let project = useSelector((state) => state.managerView.project);
  let tasks = useSelector((state) => state.managerView.tasks);

  let storyPoints = tasks.map(t => t.storyPoints).reduce((a,b) => a + b)


  return (
    <div className={styles.conteiner}>
      <div>
        <div className={styles.header}>
          <h1>Burndown</h1>
        </div>
        <div className={styles.graph}>
          {<Line
          data={{
            labels: ['0','1', '2', '3', '4', '5', '6', '7'],
            datasets: [
            {
              label: 'Actual development',
              data: [21, 16, 12, 9, 7, 5, 2, 0],
              borderColor:['#a12464']
            },
            {
              label: 'Ideal development',
              data: [21,18,15,12,9,6,3,0],
              borderColor:['#7BEFFF']
            }
          ]
          }}
          />}
        </div>
        <div className={styles.description}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>
    </div>
  );
}