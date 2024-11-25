import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const [restInfo, setRestInfo] = useState(null);
    useEffect(() => {
        fetchMenu()
    }, []);

    let {resId} = useParams();

    const fetchMenu = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.91850&lng=76.25580&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await data.json();
        setRestInfo(json.data);
    };

    const restaurantInfo = restInfo?.cards?.[2]?.card?.card?.info;
    console.log(restaurantInfo);
    const name = restaurantInfo?.name;
    const cuisines = restaurantInfo?.cuisines;
    const costForTwo = restaurantInfo?.costForTwo;

    return (restInfo === null) ? <Shimmer /> : (
        <div>
            <h1>{name}</h1>
            <h3>{cuisines.join(", ")} Cost for Two:{costForTwo/100}</h3>
            <h2>Menu</h2>
            <ul>
                {
                    cuisines.map((item)=> <li>{item}</li>)
                }
            </ul>
        </div>
    )
}
export default RestaurantMenu;