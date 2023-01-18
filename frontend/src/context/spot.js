import React, { useRef, useState, useContext, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const SpotContext = createContext()
export const useSpot = () => useContext(SpotContext)

const SpotProvider = ({children}) => {

    const [spot, setSpot] = useState(useSelector((state) => state.spot))
    const [avg, setAvg] = useState(useSelector((state) => state.spot.avgStarRating))
    const [price, setPrice] = useState(useSelector((state) => state.spot.price));
    const [description, setDescription] = useState(useSelector((state) => state.spot.description))



    return(
        <SpotContext.Provider value={{spot, setSpot, avg, setAvg, price, setPrice, description, setDescription}}>
           { children }
        </SpotContext.Provider>
    )
}

export default SpotProvider
