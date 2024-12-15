import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {

    const items = useSelector((store)=>store.cart.items);
    const dispatch = useDispatch();
    
    const handleClearCart = () => {
        dispatch(clearCart());
    }

    if(items.length === 0){
        return <div className="text-center m-2 text-2xl font-semibold">
            <h1>
                Cart is Empty. Please Add Items to the cart
            </h1>
        </div>
    }

    return <div className="text-center m-5 p-5">
        <h1 className="text-xl font-bold">Cart</h1>
        <button className=" bg-red-300 px-5 py-2 rounded-md" onClick={handleClearCart}>Clear Cart</button>
        <div className="w-6/12 m-auto">
            <ItemList items={items} />
        </div>
    </div>
}

export default Cart;