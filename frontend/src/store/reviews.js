import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview'
const DELETE_REVIEW = 'review/delete'


export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
    }
};

export const addReviw = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId,
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews))
    return reviews;
    }
}

export const postReview = ({review, stars, user, spotId}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review, stars
        })
    })
    if (response.ok) {
        dispatch(addReview(response))
        }
}

const reviewReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_REVIEWS: {
            const reviewsArr = action.payload.Reviews;
            const allReviews = {};

            reviewsArr.forEach(ele => {
                allReviews[ele.id] = ele;
            });
            return {
                ...state,
                ...allReviews
            }
        };
        case ADD_REVIEW: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reviewReducer;
