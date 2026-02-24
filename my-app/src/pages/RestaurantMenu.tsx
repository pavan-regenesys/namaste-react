import { Link, useLocation } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

// Sample menu items per cuisine (used when API data unavailable)
const CUISINE_MENU_ITEMS: Record<string, string[]> = {
  Biryani: ["Chicken Biryani", "Veg Biryani", "Mutton Biryani", "Egg Biryani"],
  Andhra: ["Andhra Chicken Curry", "Gongura Mutton", "Andhra Meals"],
  "South Indian": ["Dosa", "Idli", "Vada", "Sambar", "Upma", "Pongal"],
  Chinese: ["Fried Rice", "Hakka Noodles", "Manchurian", "Spring Rolls"],
  Seafood: ["Fish Fry", "Prawn Curry", "Crab Masala"],
  "North Indian": ["Butter Chicken", "Dal Makhani", "Paneer Tikka", "Naan"],
  Italian: ["Margherita Pizza", "Pasta", "Garlic Bread", "Tiramisu"],
  Desserts: ["Ice Cream", "Brownie", "Gulab Jamun"],
};

const RestaurantMenu = () => {
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) {
    return (
      <div style={{ padding: "20px" }}>
        <p>
          Restaurant details not found. Please go back and select a restaurant.
        </p>
      </div>
    );
  }

  const { info } = restaurant;
  const menuItems = info.cuisines?.flatMap(
    (cuisine: string) => CUISINE_MENU_ITEMS[cuisine] ?? [`${cuisine} Special`]
  ) ?? ["Menu items unavailable"];

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </Link>
      <div style={{ flex: 1, maxWidth: "800px" }}>
        <div style={{ marginBottom: "24px" }}>
          <img
            src={`${CDN_URL}${info.cloudinaryImageId}`}
            alt={info.name}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <h1 style={{ marginTop: "16px" }}>{info.name}</h1>
          <p style={{ color: "#666", margin: "8px 0" }}>
            {info.cuisines?.join(", ")}
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
            <span>⭐ {info.avgRating}</span>
            <span>{info.costForTwo}</span>
            {info.areaName && <span>• {info.areaName}</span>}
          </div>
        </div>

        <h2>Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item: string, index: number) => (
            <li
              key={`${item}-${index}`}
              style={{
                padding: "12px 16px",
                marginBottom: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
