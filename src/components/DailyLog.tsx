import { useState } from "react";
import dailyLog from "../daily-log.json";
// import dailyLog from "../daily-log-person.json";     // Replace example with your own that is .gitignored already
import './DailyLog.scss';
import ImageView from './ImageView'
import Grid from './Grid'

const enum ViewType {
    Image = 1,
    Grid = 2
}

const DailyLog = () => {
    const [viewType, setView] = useState(ViewType.Grid);
    const [imageIndex, setImageIndex] = useState(0);
    const [dayIndex, setDayIndex] = useState(0);

    const startImageView = (dayIndex: number, imageIndex: number) => {
        setView(ViewType.Image);
        setDayIndex(dayIndex);
        setImageIndex(imageIndex);
    };

    // Returns the maximum image index across all the days
    const getMaximumImageIndex = () => {
        const maxIndices = dailyLog.days.map(d => d.images.length);     // slice 2d->1d
        return Math.max(...maxIndices) - 1;
    }

    return (
        viewType === ViewType.Image ?
            <ImageView
                imagesBaseUri={dailyLog.imagesBaseUri}
                day={dailyLog.days[dayIndex]}
                imageIndex={imageIndex}
                exitImageView={() => setView(ViewType.Grid)}
                goNextDay={() => {
                    setDayIndex(dayIndex => Math.min(dayIndex + 1, dailyLog.days.length - 1));
                }}
                goPreviousDay={() => {
                    setDayIndex(dayIndex => Math.max(dayIndex - 1, 0));
                }}
                goNextImageIndex={() => 
                    setImageIndex(imageIndex => Math.min(imageIndex + 1, getMaximumImageIndex()))
                }
                goPreviousImageIndex={() => {
                    setImageIndex(imageIndex => Math.max(0, imageIndex-1));
                }}
            /> :
            <Grid
                imagesBaseUri={dailyLog.imagesBaseUri}
                startImageView={startImageView}
            />
        );
}

export default DailyLog;