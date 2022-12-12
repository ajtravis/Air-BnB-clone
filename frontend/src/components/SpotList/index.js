import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../SpotCard';

import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch()

    // const [spot, setSpot] = useState('')
    const allSpots = useSelector((state) => state.spots)

    const spots = Object.values(allSpots)

    console.log("spots", spots)
    console.log("all spots", allSpots)

    useEffect(() => {
        console.log("spots useEffect is running");
        dispatch(getAllSpots());
      }, [dispatch]);



    return (
        <div>
            <ul>
                {spots.map((ele) => (
                    ele.id ?
                    <li key={ele.id}>
                       <SpotCard city={ele.city} state= {ele.state} avgRating={ele.avgRating} price={ele.price} />
                    </li> :
                    <></>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
