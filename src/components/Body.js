import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    //Local State variable
    // Dont create this hooks outside of body
    let [restaurants, setRestaurants] = useState([]);
    let [filteredRes, setfilteredRes] = useState([]);
    //setRestaurants([]);

    const [searchText,setSearchText] = useState("");
    
    // if dependency array is not there it renderes on every render
    // If empty array is present it renders only once when header renders first time
    // if array is [btnName] => every time btnName react changes, useEffect will call
    useEffect(()=>{
        
        fetchData();  
    },[]);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.91850&lng=76.25580&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        console.log("FetchData called")
        const json = await data.json();
    // Optional Chaining
    let list = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
       setRestaurants(list);
       setfilteredRes(list);
    }

    //conditional rendering
    // if(restaurants.length===0){
    //     return <Shimmer/>
    // }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus===false){
        return (
            <h1>Check your Internet Status</h1>
        );
    }

    return restaurants.length===0 ? <Shimmer/> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="search" className="searc-box" value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}/>
                    <button onClick={()=>{
                        const searchedRes = restaurants.filter((res)=>{
                            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        });
                        setfilteredRes(searchedRes);
                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const restaurantslist = restaurants.filter((res)=>res.info.avgRating>4.5);
                    console.log(restaurantslist);
                    setfilteredRes(restaurantslist);
                }}>Top Rated Restaurants</button>
            </div>
            <div className="restaurants-container">
                {filteredRes.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                    <RestaurantCard resData={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Body;