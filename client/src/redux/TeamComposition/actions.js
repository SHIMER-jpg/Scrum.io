import { GET_CARD_STATS, GET_TEAMCOMP } from "./constants";
import axios from "axios";
require("dotenv").config();
const { REACT_APP_BACKEND_URL } = process.env;

export const getCardStats = (username, setIsLoading) => {
  return (dispatch) => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/user/languageStats/${username}`)
      .then(({ data }) => {
        setIsLoading && setIsLoading(false);
        const arrLanguages = [];

        for (const key in data) {
          arrLanguages.push({
            language: key,
            size: data[key].size,
            color: data[key].color,
          });
        }
        dispatch({
          type: GET_CARD_STATS,
          payload: { userName: username, languages: arrLanguages },
        });
      });
  };
};

export function getTeamComp(projectId) {
  return function (dispatch) {
    axios
      .get(`${REACT_APP_BACKEND_URL}/project/teamComp/${projectId}`)
      .then((json) => {
        dispatch({ type: GET_TEAMCOMP, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
