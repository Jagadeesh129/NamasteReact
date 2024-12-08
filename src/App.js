import React, { lazy, useState, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserContext from "./utils/UserContext";

const styleCard = {
    backgroundColor: "#f0f0f0"
}

// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy loading
// On Demand loading

// lazy it takes some time to import that component, it will gives error in that time
// Suspense is used for not to throw error, its telling that wait i will come
// fallback is for show something in that loading time

const Grocery = lazy(()=> import("./components/Grocery"));

const AppLayout = () => {

    const [username, setUsername] = useState();

    useEffect(()=>{
        const data = {
            name: "Mamilla Jagadeesh",
        };
        setUsername(data.name);
    },[]);

    return (
        <UserContext.Provider value = {{loggedInUser : username, setUsername}}>
        <div className="app">
            <Header />
            <Outlet/>
        </div>
        </UserContext.Provider>
    )
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>
            },
            {
                path: "/grocery",
                element: <Suspense ><Grocery/></Suspense>
            }
        ],
        errorElement: <Error />
    },

])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);