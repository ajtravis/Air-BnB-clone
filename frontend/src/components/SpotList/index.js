import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../SpotCard';
import "./SpotList.css"

import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch()

    // const [spot, setSpot] = useState('')
    const allSpots = useSelector((state) => state.spots)

    const spots = Object.values(allSpots)

    

    useEffect(() => {
        console.log("spots useEffect is running");
        dispatch(getAllSpots());
      }, [dispatch]);



    return (
        <div>
            <ul className='gallery'>
                {spots.map((ele) => (
                    ele.id ?
                    <li className='card' key={ele.id}>
                       <SpotCard city={ele.city} state= {ele.state} avgRating={ele.avgRating} price={ele.price} img={ele.previewImage} />
                    </li> :
                    <></>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
