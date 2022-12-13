import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'


const SpotDetails = (props) => {

    const spot = useSelector((state) => state.spot)

    if(!spot) return;

    const images = spot.spotImages
    const owner = spot ? spot.Owner : null;




    return (
       <div id='details-page-container'>
        <div className='head'>
            <h1>{spot.name}</h1>
            <div className='head-details'>
                <div>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    {spot.avgStarRating}
                </div>
                <div> {spot.numReviews} reviews</div>
                <div>{spot.city}, {spot.state}, {spot.country}</div>

            </div>
        </div>
        <div id='images-container'>
            <ul id="spot-image-list">
                {
                    images ? images.forEach((img) => {
                        <li>
                            <img src={img} />
                        </li>
                    }) : <></>
                }
            </ul>
        </div>
        <h2>Entire home hosted by {owner.firstName ? owner.firstName : "Anonymous"}</h2>
        <div id="description">
            <p>{spot.description}</p>
        </div>
        <div id="booking-form-container"></div>
       </div>
    )
}

export default SpotDetails;
