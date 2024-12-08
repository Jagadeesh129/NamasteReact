import { CDN_URL } from "../utils/constants";

const ItemList = (props) => {
    const items = props.items;
    console.log(items);
    return <div>
        {items.map((item) => (
            <div key={item.card.info.id} className="flex justify-between p-2 m-2 bg-gray-50 border-gray-300 border-b-2 text-left">
                <div  className=" w-9/12">
                    <div className="py-2">
                        <span className="text-xl font-bold">{item?.card?.info?.name}</span>
                        <span className="font-bold"> - ₹{(item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100}</span>
                    </div>
                    <p className="text-xs mt-2">
                        {item?.card?.info?.description}
                    </p>
                </div>
                <div className="w-3/12 p-4">
                    <div className="absolute">
                        <button className="text-black rounded-xl m-1 bg-orange-300 p-2"> 
                            +Add
                        </button>
                    </div>
                    <img src={CDN_URL + item?.card?.info?.imageId}  />
                </div>
            </div>
        ))}
    </div>
}

export default ItemList;