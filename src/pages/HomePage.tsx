import { Component, For, useContext, onMount } from "solid-js"
import Product from "../components/Product"
import { AppContext } from './../store/index';
import { api } from './../apis/index';


const HomePage:Component = ()=> {

    const [state, {setProducts, setFilter}] = useContext(AppContext)

    onMount(async () => { 
        if(!state.products || state.products.length === 0){
            fetch(api + "/products")
                .then(res=>res.json())
                .then(json=> {
                    setProducts(json)
                })
        }         
    })
    
    function handleChangeCategory(name: string){

        let updatedCategory = [...state.filter.category]
        let index = updatedCategory.indexOf(name);
        if(index === -1){
            updatedCategory.push(name)
        } else {
            updatedCategory.splice(index, 1)
        }

        setFilter({
            category: updatedCategory
        })
    }

    
    return (
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="grid grid-cols-12">
                <div class="col-span-2 px-4">
                  
                <h1 class="font-medium font-bold text-2xl  ">Selected</h1>
                    <div class="flex flex-wrap gap-2 mt-4">
                        <For each={state.filter.category}>
                            { (item)=> <div onClick={()=>handleChangeCategory(item)} class="bg-green-500/10 px-4 py-2 rounded flex justify-between">
                                <span>{item}</span>
                                <span class="ml-2 text-red-500 font-medium cursor-pointer">x</span>
                            </div> }
                        </For>
                    </div>

                    <h1 class="font-bold text-2xl  mt-8">Category</h1>
                    <div class="mt-4">
                        <For each={state.categories} fallback={<div>Loading...</div>}>
                            {(item) =>  (
                                <li class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                                    <label class="font-medium cursor-pointer" for={item.name}>{item.name}</label>
                                    <input checked={state?.filter?.category?.includes(item.name)} onChange={()=>handleChangeCategory(item.name)} type="checkbox" id={item.name} />
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