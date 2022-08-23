import { Component, createSignal, createEffect,For, useContext } from "solid-js"
import Product from "../components/Product"
import { AppContext } from './../store/index';


const HomePage:Component = ()=> {

    const [state, {setProducts}] = useContext(AppContext)


    createEffect((prev)=>{ 
        if(!state.products || state.products.length === 0){
            fetch('http://localhost:1000/products')
                .then(res=>res.json())
                .then(json=> setProducts(json))
        }         
    })



    return (
        <div class="max-w-screen-xl mx-auto px-4">

            <div class="grid grid-cols-4 gap-4 mt-4">
                <For each={state.filteredProducts ? state.filteredProducts :  state?.products} fallback={<div>Loading...</div>}>
                    {(item) => <Product {...item} />}
                </For>
            </div>

        </div>
    )
}

export default HomePage