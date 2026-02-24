import { useState, useEffect } from "react";
import resData from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";
import "../App.css";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

type Restaurant = (typeof resData)[number];

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState<Restaurant[]>([]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);

      // Try to extract restaurants from the new API structure
      // The restaurant grid listing is typically in cards[4] for the new API
      const restaurantGridCard = json?.data?.cards?.find(
        (card: {
          card?: {
            card?: {
              gridElements?: { infoWithStyle?: { restaurants?: unknown[] } };
            };
          };
        }) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      if (
        restaurantGridCard?.card?.card?.gridElements?.infoWithStyle?.restaurants
      ) {
        const restaurants =
          restaurantGridCard.card.card.gridElements.infoWithStyle.restaurants;
        setListOfRestaurants(restaurants);
      } else {
        // Fallback to old structure if new one doesn't exist
        const oldStructure = json?.data?.cards[2]?.data?.data?.cards;
        if (oldStructure) {
          setListOfRestaurants(oldStructure);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback to local data on error
      setListOfRestaurants(resData);
    } finally {
      setIsLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();

  const renderRestaurantContent = () => {
    // Show skeleton loaders while loading or filtering

    if (isLoading || isFiltering) {
      const skeletonCount = isFiltering ? listOfRestaurants.length || 8 : 12;
      return Array.from({ length: skeletonCount }, (_, index) => (
        <RestaurantCardSkeleton key={`skeleton-${index}`} />
      ));
    }

    if (listOfRestaurants.length === 0) {
      return (
        <div className="no-restaurants">
          <h3>No restaurants found</h3>
        </div>
      );
    }

    // Show actual restaurant cards when loaded
    return listOfRestaurants.map((restaurant) => (
      <Link
        key={restaurant.info.id}
        to={`/restaurant/${restaurant.info.id}`}
        state={{ restaurant }}
      >
        <RestaurantCard restaurant={restaurant} />
      </Link>
    ));
  };

  if (onlineStatus === false)
    return <h1>Looks like you are offline, please check your internet!</h1>;

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            name="search-items"
            style={{ height: "30px" }}
            id="items-search"
            value={searchText}
            onChange={(e) => {
              handleSearch(e.target.value);
              console.log(e, "event");
            }}
          />
          <button
            style={{
              height: "30px",
              marginLeft: "10px",
              cursor: "pointer",
              backgroundColor: "lightgray",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={() => {
              setIsFiltering(true);

              if (searchText.length > 0) {
                const filteredList = listOfRestaurants.filter((restaurant) =>
                  restaurant.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                );
                setListOfRestaurants(filteredList);
                console.log(filteredList, "filteredList");
              } else {
                fetchData();
                setIsFiltered(false);
              }
              setIsFiltering(false);
            }}
          >
            search
          </button>
        </div>
        <button
          className="filter-btn"
          disabled={isFiltering}
          onClick={async () => {
            setIsFiltering(true);

            // Add a small delay to show skeleton effect (better UX)
            await new Promise((resolve) => setTimeout(resolve, 300));

            if (isFiltered) {
              // Show all restaurants - restore from original
              fetchData();
              setIsFiltered(false);
            } else {
              // Filter top rated restaurants (rating > 4.5)
              const filtered = listOfRestaurants.filter((restaurant) => {
                const rating = restaurant.info?.avgRating;
                console.log(rating, "rating");

                return restaurant.info?.avgRating > 4.5;
              });
              console.log(filtered, "filtered");
              setListOfRestaurants(filtered);
              setIsFiltered(true);
            }

            setIsFiltering(false);
          }}
        >
          {isFiltered ? "Show All Restaurants" : "Top Rated Restaurants"}
        </button>
      </div>
      <div className="res-container">{renderRestaurantContent()}</div>
    </div>
  );
};

export default Body;
