import { Component, createSignal, createEffect,For, useContext } from "solid-js"
import { AppContext } from './../store/index';


const CartPage:Component = ()=> {

    const [{cart}, {setCart}] = useContext(AppContext)


    function calcTotalPrice(cart){
        let totalPrice = 1
        
        if(!cart){
            return 0;
        }
                
        for(let key in cart){
            totalPrice = (cart[key].quantity * cart[key].price)
        }
        
        return totalPrice * Object.keys(cart).length; 
    }


    return (
        <div class="max-w-screen-xl mx-auto px-4">
            
            <h2>{Date.now()}</h2>


            <div class="grid max-w-lg mx-auto">
                <For each={cart && Object.keys(cart)} fallback={<div>Loading...</div>}>
                    {(key) => (
                        <div class="flex items-center py-2 my-2">
                            <img class="w-10" src={cart[key].image} alt="" />
                            <div class="w-full flex justify-between">
                                <h1>{cart[key].title}</h1>
                                <span class="flex gap-x-2">
                                    <h2>x{cart[key].quantity}</h2>
                                    <h2>${cart[key].price}</h2>
                                </span>
                            </div>
                        </div>
                    )}
                </For>
                <h1 class="text-right font-medium text-md">Total Price: {calcTotalPrice(cart)}</h1>
            </div>

        </div>
    )
}

export default CartPage