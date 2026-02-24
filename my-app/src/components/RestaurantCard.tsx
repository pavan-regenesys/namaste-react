import resData from "../data/restaurants";
import "../App.css";
import { CDN_URL } from "../utils/constants";
import { useMemo } from "react";

type RestaurantCardProps = {
  restaurant: (typeof resData)[number];
};

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return useMemo(
    () => (
      <div className="res-card" key={restaurant.info.id}>
        <img
          src={`${CDN_URL}${restaurant.info.cloudinaryImageId}`}
          alt="res-logo"
        />
        <h3>{restaurant.info.name}</h3>
        <h4>{restaurant.info.cuisines.join(", ")}</h4>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>{restaurant.info.avgRating}⭐</h4>
          <h4>{restaurant.info.costForTwo}</h4>
        </div>
      </div>
    ),
    [restaurant]
  );
};

export default RestaurantCard;
