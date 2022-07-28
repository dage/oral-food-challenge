import './DailyLog.scss';
import ImageView from './ImageView'
import Grid from './Grid'
import { useSelector } from "react-redux";
import { IState } from "../redux/reducer";

export const enum ViewType {
    Image = "Image",
    Grid = "Grid"
}

const DailyLog = () => {
    const viewType = useSelector((state:IState) => state.view);

    return (
        viewType === ViewType.Image ?
            <ImageView /> :
            <Grid />
        );
}

export default DailyLog;