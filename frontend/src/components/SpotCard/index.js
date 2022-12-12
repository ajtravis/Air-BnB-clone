const SpotCard = ({city, state, avgRating, price}) => {
    return (
        <div className="card-container">
            <div className="card-info">
                <div className="area">{city}, {state}</div>
                <div className="rating">
                <i class="fa-sharp fa-solid fa-star"></i>
                {avgRating} </div>
            </div>
            <div className="price"> ${price} </div>
        </div>
    )
}

export default SpotCard;
