import { api } from "apis/index";
import { Component, For, useContext, onMount } from "solid-js"
import SingleProduct from "components/SingleProduct"
const ProductModal = import("src/models/ProductModel")
import { AppContext } from '../../store/index';
import SkeletonProducts from "./Skeleton.Products";
import Sidebar from "./Sidebar";


const HomePage:Component = ()=> {

    const [state, {setProducts, setFilter}] = useContext(AppContext)

    onMount(async () => { 
        if(!state.products || state.products.length === 0){

            // let {default: ProductM} = await ProductModal
            // let products = await ProductM.findAll()
            // setProducts(products)

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

                <Sidebar state={state}/>

                <div class="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    <For each={state.filteredProducts ? state.filteredProducts :  state?.products} fallback={<SkeletonProducts />}>
                        {(item) => <SingleProduct {...item} />}
                    </For>
                </div>
            </div>

        </div>
    )
}

export default HomePage