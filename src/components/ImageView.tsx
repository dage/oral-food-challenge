import { useSelector, useDispatch } from "react-redux";
import { IState } from "../redux/reducer";
import { setView, setImageIndex, setDayIndex } from "../redux/actions";
import { ViewType } from "../components/DailyLog";

import { useEffect } from "react";
import IDay from "./IDay";
import './ImageView.scss';
const inside = require("point-inside-triangle");

const ImageView = () => {
    const dispatch = useDispatch();
    const dailyLog = useSelector((state: IState) => state.dailyLog);
    const dayIndex = useSelector((state: IState) => state.dayIndex);
    const imageIndex = useSelector((state: IState) => state.imageIndex);
    const day:IDay = dailyLog.days[dayIndex];

    const goNextDay = () => {
        dispatch(setDayIndex(Math.min(dayIndex + 1, dailyLog.days.length - 1)));
    }

    const goPreviousDay = () => {
        dispatch(setDayIndex(Math.max(dayIndex - 1, 0)));
    }

    const goNextImageIndex = () => {
        dispatch(setImageIndex(Math.min(imageIndex + 1, getMaximumImageIndex())))
    }

    const goPreviousImageIndex = () => {
        dispatch(setImageIndex(Math.max(0, imageIndex-1)));
    }

    const exitImageView = () => dispatch(setView(ViewType.Grid))


    // Returns the maximum image index across all the days
    const getMaximumImageIndex = () => {
        const maxIndices = dailyLog.days.map((day:IDay) => day && day.images ? day.images.length : 0);
        return Math.max(...maxIndices) - 1;
    }

    const onKey = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                goPreviousImageIndex();
                break;
            case "ArrowRight":
                goNextImageIndex();
                break;
            case "ArrowUp":
                goPreviousDay();
                break;
            case "ArrowDown":
                goNextDay();
                break;
            case "Escape":
                exitImageView();
                break;
            default:
                break;
        }
    }

    const onClick = (event: MouseEvent) => {
        const inOnImage = event.target instanceof HTMLImageElement;

        event.preventDefault();

        if (!inOnImage) {
            exitImageView();
            return;
        }

        const image = event.target as HTMLImageElement;
        const imageRect = image.getBoundingClientRect();
        const topLeft = [0, 0];
        const topRight = [imageRect.width, 0]
        const bottomLeft = [0, imageRect.height];
        const bottomRight = [imageRect.width, imageRect.height];
        const center = [.5 * imageRect.width, .5 * imageRect.height];
        const topTriangle = [topLeft, topRight, center];
        const bottomTriangle = [bottomRight, bottomLeft, center];
        const rightTriangle = [topRight, bottomRight, center];
        const leftTriangle = [topLeft, center, bottomLeft];
        
        const point = [event.clientX - imageRect.left, event.clientY - imageRect.top];

        if(inside(topTriangle, point)) {
            goPreviousDay();
            return;
        }

        if(inside(bottomTriangle, point)) {
            goNextDay();
            return;
        }

        if(inside(rightTriangle, point)) {
            goNextImageIndex();
            return;
        }

        if(inside(leftTriangle, point)) {
            goPreviousImageIndex();
            return;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", onKey);
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("click", onClick);
        }
    });

    return (
        <div className={day.elimination ? "elimination" : ""} id='ImageView'>
            <div className="date">{day.date}</div>
            <div className="imageIndex">{imageIndex}</div>
            { day.comment && <div className="comment">{day.comment}</div> }
            { day.images && day.images[imageIndex] &&
                <img
                    src={process.env.PUBLIC_URL + dailyLog.imagesBaseUri + day.images[imageIndex]}
                    alt='Person'
                />
            }
        </div>
    )
}

export default ImageView;