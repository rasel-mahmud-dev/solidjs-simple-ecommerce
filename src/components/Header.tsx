import { Component, createSignal, useContext} from "solid-js"
import { Link, useLocation, useNavigate } from "@solidjs/router"
import {  FaSolidCartShopping, FaSolidShop, FaSolidUser} from "solid-icons/fa"
import { AppContext } from "../store"
import Button from "./Button"

const Header: Component = ()=>{

    const [state, {setSearchValue, setFilteredProducts}] =  useContext(AppContext)

    let location = useLocation()
    let navigate = useNavigate()


    const [isOpenSearch, setOpenSearch] = createSignal(false)
    
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

    function filterProducts(products, searchValue){
        let matchProducts = []
        for(let product of products){
            if(product.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1){
                matchProducts.push(product)
            }
        }
        return matchProducts
    }

    function handleChange(e: any){

        if(location.pathname !==  "/"){
            navigate("/")
        }
        
        setSearchValue(e.target.value)
        let a = filterProducts(state.products, e.target.value)
        setFilteredProducts(a)
    }

    function handleSearch(e: SubmitEvent){
        e.preventDefault();
        let a = filterProducts(state.products, state.searchValue)

        setFilteredProducts(a)
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
                <li onClick={()=>setOpenSearch(isOpen=> !isOpen )} >
                     
                    <div class="w-4 fill-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg></div>     
                    
                    
                    </li>
                    <li>
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

        { isOpenSearch() && (<div class="bg-white shadow-lg w-full py-2 -mt-3 ">
            <div class="max-w-md mx-auto">
                <form onSubmit={handleSearch} class="border border-green-500 flex items-center rounded-md rounded-tr-md rounded-br-md">
                    <input 
                        onInput={handleChange} 
                        type="text" 
                        value={state.searchValue}
                        placeholder="Enter Product Name" 
                        class="w-full bg-transparent outline-none px-4" />
                    <Button type="submit" class="mt-0 rounded-tl-none rounded-bl-none">Search</Button>
                </form>

            </div>
        </div>) }                            

        <div class="mb-20"></div>
        </div>
    )

}


export default Header