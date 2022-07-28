import { Fragment } from "react";
import './Grid.scss';
import IDay from "./IDay";

import { setView, setImageIndex, setDayIndex } from "../redux/actions";
import { IState } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { ViewType } from "../components/DailyLog";

interface IGridRowProps {
    day: IDay
    rowIndex: number,
}

const Grid = () => {
    const dailyLog = useSelector((state: IState) => state.dailyLog);

    return (
        <div id='Grid'>
            {dailyLog.days.map((day:IDay, i:number) =>
                <GridRow                    
                    day={day}
                    key={day.date}
                    rowIndex={i}
                />)
            }
        </div>
    );
}

const GridRow = (props: IGridRowProps) => {
    const eliminationClassName = props.day.elimination ? "elimination " : "";
    const dispatch = useDispatch();
    const dailyLog = useSelector((state: IState) => state.dailyLog);

    const startImageView = (dayIndex: number, imageIndex: number) => {
        dispatch(setView(ViewType.Image));
        dispatch(setDayIndex(dayIndex));
        dispatch(setImageIndex(imageIndex));
    };

    return (
        <Fragment>
            <div className={eliminationClassName + "date"}>{props.day.date}</div>
            <div className={eliminationClassName + "images"}>
                {props.day.images && props.day.images.map((image, imageIndex) =>
                    <div key={"image" + imageIndex} className='GridImageContainer'>
                        { image &&
                            <img
                                src={image && process.env.PUBLIC_URL + dailyLog.imagesBaseUri + image}
                                onClick={() => startImageView(props.rowIndex, imageIndex)}
                                alt='' />
                        }
                    </div>
                )}
            </div>
            <div className={eliminationClassName + "comment"}>{props.day.comment}</div>
        </Fragment>
    );
}

export default Grid;