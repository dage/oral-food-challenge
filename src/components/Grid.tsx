import { Fragment } from "react";
import dailyLog from "../daily-log.json";
import './Grid.scss';
import IDay from "./IDay";

interface IGridProps {
    imagesBaseUri: string;
    startImageView: Function
}

interface IGridRowProps {
    imagesBaseUri: string,
    day: IDay
    rowIndex: number,
    onClick: Function
}

const Grid = (props: IGridProps) => {
    return (
        <div id='Grid'>
            {dailyLog.days.map((d, i) =>
                <GridRow                    
                    imagesBaseUri={props.imagesBaseUri}
                    day={d}
                    key={d.date}
                    rowIndex={i}
                    onClick={props.startImageView}
                />)
            }
        </div>
    );
}

const GridRow = (props: IGridRowProps) => {
    const eliminationClassName = props.day.elimination ? "elimination " : "";

    return (
        <Fragment>
            <div className={eliminationClassName + "date"}>{props.day.date}</div>
            <div className={eliminationClassName + "images"}>
                {props.day.images && props.day.images.map((image, imageIndex) =>
                    <div key={"image" + imageIndex} className='GridImageContainer'>
                        { image &&
                            <img
                                src={image && process.env.PUBLIC_URL + props.imagesBaseUri + image}
                                onClick={() => props.onClick(props.rowIndex, imageIndex)}
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