import { Component, createSignal, createEffect,For, useContext } from "solid-js"
import { AppContext } from './../store/index';
import {Link} from "@solidjs/router";


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
        <div class="max-w-3xl mx-auto px-4">
            <div class="grid mx-auto">
                <For each={cart && Object.keys(cart)} fallback={<div>Loading...</div>}>
                    {(key) => (
                        <label for={key} class="flex items-center py-2 my-2 cursor-pointer hover:bg-green-100 px-4" >

                            <img class="w-10" src={cart[key].image} alt="" />
                            <div class="w-full flex justify-between">
                                <h1 class="ml-3">
                                    <Link class="link" href={`/details/${cart[key].id}`}>
                                        {cart[key].title}
                                    </Link>
                                </h1>
                                
                                <div class="flex items-center gap-x-8">
                                    <span class="flex gap-x-2">
                                        <h2>x{cart[key].quantity}</h2>
                                        <h2>${cart[key].price}</h2>
                                    </span>
                                    <input type="checkbox" id={key}/>
                                </div>
                            </div>
                        </label>
                    )}
                </For>
                <h1 class="text-right font-medium text-md">Total Price: ${calcTotalPrice(cart)}</h1>

            </div>
            <div class="flex justify-between mt-6">
                <Link href="/" class="link">Shopping</Link>
                <Link href="/checkout" class="link">Checkout</Link>
            </div>
        </div>
    )
}


export default CartPage