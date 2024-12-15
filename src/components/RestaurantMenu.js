import { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    let { resId } = useParams();

    const [showIndex,setShowIndex] = useState(0);

    const resInfo = useRestaurantMenu(resId);
    const restaurantDetails = resInfo?.cards[2]?.card?.card?.info;
    // console.log(resInfo);
    const name = restaurantDetails?.name;
    const cuisines = restaurantDetails?.cuisines;
    const costForTwo = restaurantDetails?.costForTwo;
    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.
        filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    return (resInfo === null) ? <Shimmer /> : (
        <div className="text-center">
            <h1 className="font-bold mt-10 text-2xl">{name}</h1>
            <p className="font-bold">{cuisines.join(", ")} Cost for Two:{costForTwo / 100}</p>
            {/* //Accodian for categories */}
            
            {categories.map((category,i)=> <RestaurantCategory key={i} showItems={i === showIndex ? true : false} setShowIndex={()=>setShowIndex(i)} data={category.card.card}/>)}
        </div>
    )
}
export default RestaurantMenu;