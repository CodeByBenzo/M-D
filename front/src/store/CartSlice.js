import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const storedItems = localStorage.getItem("cart-items") ? 
    JSON.parse(localStorage.getItem("cart-items")):[]

const initialState ={
    cartItems:storedItems,
    totalQuantity:0,
    totalAmount:0
}

const CartSlice = createSlice({
    name:"cart",
    initialState,  
    reducers:{
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`${action.payload.product} quantity has been increased.`,{
                    position:'top-left',
                })
            }else{
                const tempProducts = {...action.payload,cartQuantity:1}
                state.cartItems.push(tempProducts)
                toast.success(`${action.payload.product} has been added to cart.`,{
                    position:'top-left',
                })
            }
            localStorage.setItem("cart-items",JSON.stringify(state.cartItems))
        },
        removeFromCart(state,action){
            let cart = state.cartItems.filter((item) =>{
                return(
                    item.id !== action.payload.id
                )
            })
            state.cartItems = cart
            localStorage.setItem("cart-items",JSON.stringify(state.cartItems))
            toast.success(`${action.payload.product} has been removed from cart.`,{
                position:'top-left',
            })
        },
        clearCart(state,action){
            state.cartItems = [];
            toast.success(`cart has been cleared.`,{
                position:'top-left'
            })
            localStorage.setItem("cart-items",JSON.stringify(state.cartItems))
        },
        getTotals(state,action){
            let {total,quantity} = state.cartItems.reduce((cartTotal,cartItem)=>{
                const { price,cartQuantity } = cartItem
                const itemTotal = price.replace("TND.","").replace(/,/g,'') * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            },{
                total:0,
                quantity:0
            })
            state.totalQuantity = quantity
            state.totalAmount = total
        }
    }
})

export const { addToCart,removeFromCart,clearCart,getTotals } = CartSlice.actions
export default CartSlice.reducer 