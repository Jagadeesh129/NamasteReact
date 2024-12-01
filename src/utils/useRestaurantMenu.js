import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
    //fetch data
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.91850&lng=76.25580&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await data.json();
        setResInfo(json.data);
    };

    // debugger
    return resInfo;
}

export default useRestaurantMenu;