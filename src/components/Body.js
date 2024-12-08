import RestaurantCard, { withTopRestaurantLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    //Local State variable
    // Dont create this hooks outside of body
    let [restaurants, setRestaurants] = useState([]);
    let [filteredRes, setfilteredRes] = useState([]);
    //setRestaurants([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardTop = withTopRestaurantLabel(RestaurantCard);

    // if dependency array is not there it renderes on every render
    // If empty array is present it renders only once when header renders first time
    // if array is [btnName] => every time btnName react changes, useEffect will call
    useEffect(() => {

        fetchData();
    }, []);

    const {setUsername, loggedInUser} = useContext(UserContext);

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

    if (onlineStatus === false) {
        return (
            <h1>Check your Internet Status</h1>
        );
    }

    return restaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search m-4 p-4 ">
                    <input type="search" className="border rounded-md m-2 border-orange-400" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button className="px-2 rounded-lg bg-green-100" onClick={() => {
                        const searchedRes = restaurants.filter((res) => {
                            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        });
                        setfilteredRes(searchedRes);
                    }}>Search</button>

                    <button className="p-3 rounded-xl bg-yellow-300 mx-40" onClick={() => {
                        const restaurantslist = restaurants.filter((res) => res.info.avgRating > 4.5);
                        console.log(restaurantslist);
                        setfilteredRes(restaurantslist);
                    }}>Top Rated Restaurants</button>

                    <label>UserName: </label><input className="p-3 rounded-xl bg-yellow-50 " value={loggedInUser} onChange={(e)=>setUsername(e.target.value)} type="text" />
                </div>
            </div>
            <div className="restaurants-container flex flex-wrap">
                {filteredRes.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>

                        {/* // If Restaurant has more than 4.5 rating we are adding top restaurant label */}
                        {
                            restaurant.info.avgRating >= 4.5 ? <RestaurantCardTop resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                        }

                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Body;