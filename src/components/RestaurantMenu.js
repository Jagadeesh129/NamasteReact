import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {

    let {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info;
    console.log(restaurantInfo);
    const name = restaurantInfo?.name;
    const cuisines = restaurantInfo?.cuisines;
    const costForTwo = restaurantInfo?.costForTwo;

    return (resInfo === null) ? <Shimmer /> : (
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