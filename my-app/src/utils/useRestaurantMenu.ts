import { useState,useEffect } from "react"

const  useRestaurantMenu = () => {
    const [resMenu, setResMenu] = useState(null)
    
    useEffect(() => {
        fetchResMenu()
    }, [])
    
    const fetchResMenu = async() => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        setResMenu(json.data)

    }
    return resMenu

    
}
export default useRestaurantMenu;