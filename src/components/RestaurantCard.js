import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const RestaurantCard = (props) => {
    const { resData } = props;
    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime
    } = resData.info;
    // console.log(resData.info);

    const { loggedInUser } = useContext(UserContext)

    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="res-logo rounded-lg" src={CDN_URL + cloudinaryImageId} />
            <h3 className="font-bold py-2">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} starts</h4>
            <h4>{costForTwo} For Two</h4>
            <h4>{deliveryTime} minutes</h4>
            <h4>User: {loggedInUser}</h4>
        </div>
    )
}

export const withTopRestaurantLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white border border-gray-200">Top Restaurant</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;