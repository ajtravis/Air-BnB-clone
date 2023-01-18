import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../SpotCard';
import "./SpotList.css"
import { findSpot } from '../../store/singleSpot';
import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch()

    const allSpots = useSelector((state) => state.spots)

    const [spots, setSpots] = useState(Object.values(allSpots))


    useEffect(() => {
        setSpots(Object.values(allSpots))
      }, [allSpots]);

    useEffect(() => {
        console.log("spots useEffect is running");
        dispatch(getAllSpots());
        setSpots(Object.values(allSpots))
      }, [dispatch]);



    return (
        <div>
            <ul className='gallery'>
                {spots.map((ele) => (
                    ele.id ?
                    <li className='card' key={ele.id}>
                       <SpotCard id={ele.id} city={ele.city} state= {ele.state} avgRating={ele.avgRating} price={ele.price} previewImage={ele.previewImage} />
                    </li> :
                    <></>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
