import "../App.css"

const RestaurantCardSkeleton = () => {
  return (
    <div className="res-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-footer">
        <div className="skeleton-line skeleton-rating"></div>
        <div className="skeleton-line skeleton-price"></div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;

