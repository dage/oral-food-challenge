import { useEffect } from "react";
import IDay from "./IDay";
import './ImageView.scss';
const inside = require("point-inside-triangle");

interface IImageViewProps {
    imagesBaseUri: string,
    day: IDay,
    imageIndex: number,
    exitImageView: Function,
    goNextDay: Function,
    goPreviousDay: Function,
    goNextImageIndex: Function,
    goPreviousImageIndex: Function
}

const ImageView = (props: IImageViewProps) => {
    const onKey = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                props.goPreviousImageIndex();
                break;
            case "ArrowRight":
                props.goNextImageIndex();
                break;
            case "ArrowUp":
                props.goPreviousDay();
                break;
            case "ArrowDown":
                props.goNextDay();
                break;
            case "Escape":
                props.exitImageView();
                break;
            default:
                break;
        }
    }

    const onClick = (event: MouseEvent) => {
        const inOnImage = event.target instanceof HTMLImageElement;

        event.preventDefault();

        if (!inOnImage) {
            props.exitImageView();
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
            props.goPreviousDay();
            return;
        }

        if(inside(bottomTriangle, point)) {
            props.goNextDay();
            return;
        }

        if(inside(rightTriangle, point)) {
            props.goNextImageIndex();
            return;
        }

        if(inside(leftTriangle, point)) {
            props.goPreviousImageIndex();
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
        <div className={props.day.elimination ? "elimination" : ""} id='ImageView'>
            <div className="date">{props.day.date}</div>
            <div className="imageIndex">{props.imageIndex}</div>
            { props.day.comment && <div className="comment">{props.day.comment}</div> }
            { props.day.images && props.day.images[props.imageIndex] &&
                <img
                    src={process.env.PUBLIC_URL + props.imagesBaseUri + props.day.images[props.imageIndex]}
                    alt=''
                />
            }
        </div>
    )
}

export default ImageView;