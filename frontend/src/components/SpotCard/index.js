import "./SpotCard.css"
import { findSpot } from "../../store/singleSpot";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'




const SpotCard = ({id, city, state, avgRating, price, previewImage}) => {

    const allSpots = useSelector((state) => state.spots)
    // avgRating = Math.round(avgRating * 100)/100
    const dispatch = useDispatch()

    let history = useHistory();

    const handleClick = () => {
        dispatch(findSpot(id));
        history.push(`/spots/${id}`)
    }
    return (
        <div onClick={handleClick} className="card-container">
            <div className="img-container">
            <img src={previewImage} alt="img.jpg" />
            </div>
            <div className="card-info">
                <div className="area">{city}, {state}</div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                {Math.round(avgRating * 100)/100} </div>
            </div>
            <div className="price"> ${Math.round(price)} </div>
        </div>
    )
}

export default SpotCard;
