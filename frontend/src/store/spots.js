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
    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots;
}

const initialState = {spots: {}}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
        const spotsArr = action.payload.Spots;
        const allSpots = {}

        spotsArr.forEach(ele => {
            allSpots[ele.id] = ele;
        });

        return {
            ...state,
            ...allSpots
        }
      default:
        return state;
    }
  };

export default spotsReducer;
