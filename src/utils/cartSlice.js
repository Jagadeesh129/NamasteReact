const { createSlice } = require("@reduxjs/toolkit");


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem : (state, action)=>{
            // mutating the state here
            // Redux Tool kit uses immerJS
            state.items.push(action.payload);
        },
        removeItem : (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            // Behind the scene Immer.JS is used to clear cart
            state.items.length = 0;

            // or return { items: [] };
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;