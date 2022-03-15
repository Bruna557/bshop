import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

import "./style.css";

const Rating = (props) => {
    var [solidStars, decimal] = props.rating.toString().split(".");
    var halfStar = decimal >= 5 ;
    var emptyStars = 5 - solidStars - (halfStar ? 1 : 0);

    return (
        <>
            { [...Array(parseInt(solidStars))].map((_, key) => <span key={key}><FontAwesomeIcon icon={faStar} /></span>) }
            { halfStar &&  <span><FontAwesomeIcon icon={faStarHalfStroke} /></span> }
            { [...Array(emptyStars)].map((_, key) => <span key={key}><FontAwesomeIcon icon={emptyStar} /></span>) }
        </>
    );
}

export default Rating;
