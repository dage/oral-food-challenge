import * as actionTypes from './actionTypes';
import { ViewType } from '../components/DailyLog';

export const setView = (type:ViewType) => {
    return {
        type: actionTypes.SET_VIEW,
        payload: {
            view: type,
        }
    }
}

export const setImageIndex = (imageIndex:number) => {
    return {
        type: actionTypes.SET_IMAGE_INDEX,
        payload: {
            imageIndex: imageIndex,
        }
    }
}

export const setDayIndex = (dayIndex:number) => {
    return {
        type: actionTypes.SET_DAY_INDEX,
        payload: {
            dayIndex: dayIndex,
        }
    }
}
