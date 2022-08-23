import { Component, createEffect, useContext} from "solid-js"
import { Link } from "@solidjs/router"
import { FaSolidCartShopping, FaSolidShop, FaSolidUser} from "solid-icons/fa"
import { AppContext } from "../store"

const Header: Component = ()=>{

    const [state] =  useContext(AppContext)

    
    function countQuantity(cart){
        let count = 0
        
        if(!cart){
            return count;
        }
                
        for(let key in cart){
            count += cart[key].quantity
        }
        
        return count;
        
    }

    return (
        <div>
            <header class="bg-green-500 shadow-lg fixed top-0 left-0 w-full">
            <div class="max-w-screen-xl mx-auto px-4 py-4 grid grid-cols-12 items-center">

                <ul class="justify-end col-span-4 lg:col-span-3 ">
                    <li class="">
                        <Link href="/" class="flex items-center text-white">
                        <FaSolidShop class="text-4xl text-orange-500 " />
                        <h1 class="ml-2 font-medium text-2xl">Solidjs Ecommerce</h1></Link>
                    </li>
                </ul>                

                <ul class="flex gap-x-6 justify-self-center col-span-6">
                    <li class="text-white font-medium">
                        <Link href="/">Shopping</Link>
                    </li>
                    <li class="text-white font-medium">
                        <Link href="/cart">Cart Page</Link>
                    </li>
                    <li class="text-white font-medium">
                        <Link href="/">About Page</Link>
                    </li>
                    <li class="text-white font-medium">
                        <Link href="/">Contact Page</Link>
                    </li>
                </ul>

                <ul class="flex gap-x-4 items-center justify-self-end col-span-2 lg:col-span-3">
                    <li >
                        <Link href="/cart" class="flex items-center">
                            <FaSolidCartShopping class="text-xl text-white" />
                            <span class="text-white ml-1.5 font-medium text-lg">{countQuantity(state.cart)}</span>
                        </Link>
                    </li>
                    <li class="">
                        { state.auth ? (
                          <div class="flex items-center">
                            <FaSolidUser class="text-xl text-white" />
                            <span class="text-white ml-1 font-medium">{state.auth.email.substr(0, 5)}</span>
                          </div>  
                        ) : ( <Link href="/login" class="flex  items-center">
                            <FaSolidUser class="text-xl text-white" />
                            <span class="text-white ml-1 font-medium">Login</span>
                        </Link> )
                        }
                    </li>
                </ul>

            </div>
        </header>
        <div class="mb-20"></div>
        </div>
    )

}


export default Header