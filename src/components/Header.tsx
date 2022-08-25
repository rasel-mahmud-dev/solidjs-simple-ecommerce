import { Component, createSignal, Show, useContext} from "solid-js"
import { Link, useLocation, useNavigate } from "@solidjs/router"
import {  FaSolidCartShopping, FaSolidShop, FaSolidUser} from "solid-icons/fa"
import { AppContext } from "../store"
import Button from "./Button"

import { RiUserAdminFill } from 'solid-icons/ri'
import { IoAddCircleOutline } from 'solid-icons/io'
import { OcSignout2 } from 'solid-icons/oc'
import { OcSignin2 } from 'solid-icons/oc'
import { getAuth } from 'firebase/auth';

const Header: Component = ()=>{

    const [state, {setSearchValue, setFilteredProducts, login}] =  useContext(AppContext)

    let location = useLocation()
    let navigate = useNavigate()


    const [isOpenSearch, setOpenSearch] = createSignal(false)

    const [isOpenDropdown, setOpenDropdown] = createSignal(false)
    
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

    async function handleLogout(){
        try{
            const auth = getAuth()
            let a =  await auth.signOut()        
            login(null)
            setOpenDropdown(false)
        } catch(ex){

        }
    }

    function authDropdown(isAuth: boolean){
        return (
            <div class="shadow-md p-3 bg-white absolute right-6 top-12 w-40">
                {isAuth ? (
                    <>
                    <li class="hover:text-green-400">
                        <Link class="flex items-center gap-x-1" onClick={()=>setOpenDropdown(false)} href="/admin">
                            <RiUserAdminFill />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                        <li class="hover:text-green-400 mt-1">
                            <Link class="flex items-center gap-x-1" onClick={()=>setOpenDropdown(false)} href="admin/add-product">
                            <IoAddCircleOutline />
                            Add Product

                            </Link>
                        </li>
                        <li class="flex items-center gap-x-1 hover:text-green-400 mt-1" onClick={handleLogout}>
                            <OcSignout2 /> 
                            Logout
                        </li>
                    </>
                ) : (
                    <>
                        <li class="flex items-center gap-x-2 hover:text-green-400 mt-1">
                            <Link class="flex items-center gap-x-1"  onClick={()=>setOpenDropdown(false)} href="pages/auth/Login">
                                <OcSignin2/>
                                Login</Link></li>
                    </>
                )}
                
            </div>
        )
    }


    return (
        <div>
            <header class="bg-green-500 shadow-lg fixed z-40 top-0 left-0 w-full">
            <div class="max-w-screen-xl mx-auto px-4 grid grid-cols-12 items-center">

                <ul class="justify-end col-span-3 sm:col-span-6 lg:col-span-3 ">
                    <li class="">
                        <Link href="/" class="flex items-center text-white">
                        <FaSolidShop class="text-4xl text-orange-500 " />
                        <h1 class="ml-2 font-medium text-lg md:text-2xl">Solidjs <span class="hidden sm:inline-block">Ecommerce</span></h1></Link>
                    </li>
                </ul>                

                <ul class="hidden lg:flex gap-x-6 justify-self-center col-span-6">
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

                <ul class="flex gap-x-4 items-center justify-self-end col-span-9 sm:col-span-6 lg:col-span-3">

                    <li class="py-4" onClick={()=>setOpenSearch(isOpen=> !isOpen )} >
                     
                    <div class="w-4 fill-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg></div>     
                    
                    
                    </li>
                    <li class="py-4">
                        <Link href="/cart" class="relative flex items-center">
                            <FaSolidCartShopping class="text-xl text-white" />
                            <span class="absolute -top-3 left-2 text-gray-900 px-1 text-xs flex justify-center items-center rounded-full bg-white ml-1.5 font-medium">{countQuantity(state.cart)}</span>
                        </Link>
                    </li>
                    <li class="w-full py-4 relative" onMouseOver={()=>setOpenDropdown(true)} onMouseLeave={()=>setOpenDropdown(false)}>
                    
                
                        { state.auth ? (
                          <div class="flex items-center" >
                             
                              { state.auth?.avatar  
                                ? <img class="w-6 h-6 rounded-full " src={state.auth.avatar}  />
                                : <FaSolidUser class="text-xl text-white" /> 
                              }
        
                            <span class="text-white ml-1 font-medium">{state.auth.username ? state.auth.username : state.auth.email.substr(0, 5)}</span>
                            
                          </div>  
                            ) : ( <Link href="/login" class="flex  items-center">
                                <FaSolidUser class="text-xl text-white" />
                                <span class="text-white ml-1 font-medium">Login</span>
                            </Link> )
                        }

                        <Show
                            when={isOpenDropdown()}>
                            {authDropdown(state.auth)}
                        </Show>  

                    </li>
                </ul>

            </div>
        </header>

        { isOpenSearch() && (<div class="bg-white shadow-lg w-full pb-2 -mt-3 ">
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