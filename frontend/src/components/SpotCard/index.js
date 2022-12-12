import "./SpotCard.css"

const SpotCard = ({city, state, avgRating, price, previewImage}) => {
    return (
        <div className="card-container">
            <img src={previewImage} alt="img.jpg" />
            <div className="card-info">
                <div className="area">{city}, {state}</div>
                <div className="rating">
                <i className="fa-sharp fa-solid fa-star"></i>
                {avgRating} </div>
            </div>
            <div className="price"> ${price} </div>
        </div>
    )
}

export default SpotCard;
