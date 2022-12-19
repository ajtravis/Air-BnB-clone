import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { postReview } from '../../store/reviews'
import './ReviewForm.css'

const AddReviewForm = () => {
    const user = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spot)
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([]);
    const [hover, setHover] = useState(0);

    if(!spot) return;

    const spotId = spot.id;



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postReview({spotId, review, stars, user, reviewImages: []}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push(`/spots/${spotId}`);
    }

    return(
        <>
        <div className='container'>
        <h1>Post A Review</h1>
        <form className="review-form" onSubmit={handleSubmit}>
        {
        errors.length ? (<ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>) :
        (<></>)
        }

        <label>
            Stars
            <input
            type="number"
            value={stars}
            min="1"
            max="5"
            onChange={(e) => setStars(e.target.value)}
            required
            />
        </label>
        <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='write a review'
            required
        />

        <button className='review-button' type="submit">Submit</button>
        </form>
        </div>
        </>
    )
}

export default AddReviewForm;
