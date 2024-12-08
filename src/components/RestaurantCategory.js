import ItemList from "./ItemList";
import { useEffect, useState } from "react";

const RestaurantCategory = (props) => {
    const data = props.data;
    let showItems = props.showItems;
    const handleClick = () => {
        props.setShowIndex();
    }

    return (
        <div className="bg-gray-50 w-6/12 mx-auto my-4 shadow-lg p-4 ">
            {/* Header */}
            <div className=" flex justify-between" onClick={handleClick}>
                <span className="font-bold text-lg">{data?.title} ({data?.itemCards?.length})</span>
                <span>{"⬇"}</span>
            </div>
            {/* Accordian Body */} 
            {showItems && <ItemList items={data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory;