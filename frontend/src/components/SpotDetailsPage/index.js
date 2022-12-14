import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpotThunk } from '../../store/spots'
import * as sessionActions from '../../store/session';


const SpotDetails = (props) => {

    const spot = useSelector((state) => state.spot)

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)

    const owner = spot.Owner;




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
                {
                (user && user.id === owner.id) ?
                <button>Delete Spot</button> :
                <></>
                }
            </div>
        </div>
        <div id='images-container'>
            <ul id="spot-image-list">
                {
                      spot.SpotImages.map((img) => (
                        <li>
                            <img src={img.url} />
                        </li>
                      ))
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
