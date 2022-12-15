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
        <h1>Post A Review</h1>
        <form onSubmit={handleSubmit}>
        {
        errors.length ? (<ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>) :
        (<></>)
        }

        {/* <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                <button
                    type="button"
                    key={index}
                    className={index <= (hover || stars) ? "on" : "off"}
                    onClick={() => setStars(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(stars)}
                >
                    <span className="star">&#9733;</span>
                </button>
                );
            })}
            </div> */}
        <label>
            Stars
            <input
            type="number"
            value={stars}
            min="0"
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

        <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default AddReviewForm;
