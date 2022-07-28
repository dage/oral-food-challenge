import * as actionTypes from './actionTypes'
import { ViewType } from '../components/DailyLog'
import dailyLog from "../daily-log.json";
// import dailyLog from "../daily-log-person.json";     // Replace example with your own that is .gitignored already

export interface IState {
    view: ViewType,
    dayIndex: number,
    imageIndex: number,
    dailyLog: any,
}

const initialState:IState = {
    view: ViewType.Grid,
    dayIndex: 0,
    imageIndex: 0,
    dailyLog: dailyLog
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_VIEW:
        return {
            ...state,
            view: action.payload.view,
        }
    case actionTypes.SET_IMAGE_INDEX:
        return {
            ...state,
            imageIndex: action.payload.imageIndex,
        }
    case actionTypes.SET_DAY_INDEX:
        return {
            ...state,
            dayIndex: action.payload.dayIndex,
        }        
    default:
      return state;
  }
}

export default reducer;