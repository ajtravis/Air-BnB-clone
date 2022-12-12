const SpotCard = ({address, avgRating, price}) => {
    return (
        <div className="card-container">
            <div>
            {address}, {avgRating}, ${price}
            </div>
        </div>
    )
}

export default SpotCard;
