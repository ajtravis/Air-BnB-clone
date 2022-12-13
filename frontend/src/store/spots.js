import { csrfFetch } from './csrf';

// action constants
const LOAD_SPOTS = 'spots/loadSpots';
const NEW_SPOT = 'spots/newSpot'


// action creators
const loadSpots = (spots) => {
    console.log("LOADING SPOTS")
    return {
    type: LOAD_SPOTS,
    payload: spots,
    }
};

const add = (spot) => {
    return {
        type: NEW_SPOT,
        payload: spot,
    }
}

// thunks
export const getAllSpots = () => async (dispatch) => {
    console.log("getting spots")
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots;
    }
}

export const createSpot = (newSpot) => async (dispatch) => {
    const response = await csrfFetch('.api', {
        method: 'POST',
        body: JSON.stringify(newSpot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot))
        return spot;
        }
}

// make helper functions folder later
const normalize = (array) => {
    const result = {};
    array.map((ele) => result[ele.id] = ele)
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
        const spotsArr = action.payload.Spots;
        const allSpots = {};

        spotsArr.forEach(ele => {
            allSpots[ele.id] = ele;
        });

        return {
            ...state,
            ...allSpots
        }
        case NEW_SPOT:
            const newState = {
                ...state,
                [action.spot.id] : action.spot
            }
             console.log("newState", newState)
      default:
        return state;
    }
  };

export default spotsReducer;
