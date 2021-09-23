/* eslint-disable import/no-anonymous-default-export */
import { GET_TEAMCOMP, GET_CARD_STATS } from "./constants";

const initialState = {
  teamComp: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_STATS:
      return {
        ...state,
        teamComp: [
          ...state.teamComp.map((card) => {
            if (card.userInfo.github === action.payload.userName) {
              return {
                ...card,
                userInfo: {
                  ...card.userInfo,
                  languages: action.payload.languages,
                },
              };
            }
            return card;
          }),
        ],
      };
    case GET_TEAMCOMP:
      return {
        ...state,
        teamComp: action.payload,
      };
    default:
      return state;
  }
};
