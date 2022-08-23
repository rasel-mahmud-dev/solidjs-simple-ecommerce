import { Component, createSignal, createEffect,For, useContext } from "solid-js"
import Product from "../components/Product"
import { AppContext } from './../store/index';


const HomePage:Component = ()=> {

    const [state, {setProducts}] = useContext(AppContext)


    createEffect((prev)=>{ 
        if(!state.products || state.products.length === 0){
            fetch('http://localhost:1000/products')
                .then(res=>res.json())
                .then(json=> {
                    setProducts(json)
                })
        }         
    })

    
    return (
        <div class="max-w-screen-xl mx-auto px-4">

            <div class="grid grid-cols-12">
                <div class="col-span-2 px-4">
                    <h1 class="font-medium text-center">Category</h1>
                    <div class="mt-4">
                        <For each={state.categories} fallback={<div>Loading...</div>}>
                            {(item) =>  (
                                <li class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                                    <label class="font-medium cursor-pointer" for={item.name}>{item.name}</label>
                                    <input type="checkbox" id={item.name} />
                                </li>
                            ) }
                        </For>
                    </div>
                </div>
                <div class="col-span-10 grid grid-cols-4 gap-4 mt-4">
                    <For each={state.filteredProducts ? state.filteredProducts :  state?.products} fallback={<div>Loading...</div>}>
                        {(item) => <Product {...item} />}
                    </For>
                </div>
            </div>

        </div>
    )
}

export default HomePage