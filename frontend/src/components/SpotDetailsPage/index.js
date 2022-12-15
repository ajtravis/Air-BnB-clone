import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpotThunk, editSpot } from '../../store/spots'
import { useHistory, Redirect } from 'react-router-dom';
import SpotReviewsComponent from '../SpotReviewsComponent';
import { getSpotReviews } from '../../store/reviews';
import { findSpot } from '../../store/singleSpot';
import { useParams } from "react-router-dom";
import * as sessionActions from '../../store/session';


const SpotDetails = () => {

    const spot = useSelector((state) => state.spot)
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const owner = spot.Owner;
    const allReviews = useSelector((state) => state.reviews)
    const reviews = Object.values(allReviews)
    const {id} = useParams()


    useEffect(() => {
        console.log("reviews useEffect is running");
        dispatch(findSpot(id))
        dispatch(getSpotReviews(spot.id));
      }, [dispatch]);

    const deleteHandler = (e) => {
        dispatch(deleteSpotThunk(spot.id))
        history.push('/')
    };

    const updateHandler = (e) => {
       history.push(`/spots/update`)
    };

    const reviewHandler = (e) => {
        history.push(`/reviewForm`)
    }

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
                <button onClick={deleteHandler}>Delete Spot</button> :
                <></>
                }
                {
                (user && user.id === owner.id) ?
                <button onClick={updateHandler}>Update Spot</button> :
                <></>
                }
            </div>
        </div>
        <div id='images-container'>
            <ul id="spot-image-list">
                {
                      spot.SpotImages.map((img) => (
                        <li key={img.id}>
                            <img src={img.url} />
                        </li>
                      ))
                }
            </ul>
        </div>
        <h2>Entire home hosted by {owner.firstName ? owner.firstName : "Anonymous"}</h2>
        <div id="description">
            <p>{spot.description}</p>
        </div >
            <div>
            <SpotReviewsComponent reviews={reviews} />
            </div>
            <button onClick={reviewHandler}>Write a review</button>
       </div>

    )
}

export default SpotDetails;
