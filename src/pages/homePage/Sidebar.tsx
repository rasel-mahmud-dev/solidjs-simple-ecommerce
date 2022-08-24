import { FaSolidAngleRight } from "solid-icons/fa";
import { createEffect, createSignal, For } from "solid-js";
import { findCategoryBrand } from "src/utils";



function Sidebar({ state, setFilter }) {

    const [categories, setCategories] = createSignal({});
    const [brands, setBrands] = createSignal(null);


    function findChildCategory(categories, parent_id) {
        let items = {}
        categories.filter(cat=>{
            if(cat.parent_id === parent_id){
                items[cat._id] = cat
            }
        })        
        return items
    }

    function findRootCategories(categories) {
        let items = {}
        categories.filter(cat=>{
            if(!cat.parent_id){
                items[cat._id] = cat
            }
        })        
        return items
    }

    const deepFreeze = (obj) => {        
        obj && Object.keys(obj).forEach(prop => {
          if (typeof obj[prop] === 'object') deepFreeze(obj[prop]);
        });
            return {...obj};
    };
      
     
    function isRootCat(cat: {parent_id?: string}){
        return !cat.parent_id 
    }

    function isExpanded(categories: any, cat: {_id: string}){        
        return !categories[cat._id] || !!categories[cat._id].sub
    }
    
    function handleExpandChildCategory(item: {name: string, _id: string, parent_id?: string}){
        let a = categories()
        
        let updateCategory = deepFreeze(a)


        let sub = findChildCategory(state.categories, item._id)
        
        // if click root category item and if it expanded
        if(isRootCat(item) && isExpanded(updateCategory, item)){
            // collapse all and show all root categories
     
            setCategories({...findRootCategories(state.categories)})
            return;
        }
        
        if(isRootCat(item)){
            if(updateCategory[item._id].sub){
                updateCategory[item._id].sub = {
                    ...updateCategory[item._id].sub, 
                    sub
                }
            } else {
                updateCategory[item._id] = {
                    ...updateCategory[item._id],
                    sub: sub
                }
            }
        
            let onlySelectedRootCat = { [item._id]:  updateCategory[item._id]}
            setCategories(onlySelectedRootCat)
            return;
        }

        handleChangeCategory(item)

    }

    createEffect(()=>{
        setCategories(findRootCategories(state.categories))
    }, state.categories)    


    function handleChangeCategory(item: {name: string, _id: string}){

        let updatedCategory = state.filter.category
        if(updatedCategory && updatedCategory._id === item._id){
            updatedCategory = null
            setBrands(null)
        } else {
            updatedCategory = {
                name: item.name,
                _id: item._id
            }
            let brands = findCategoryBrand(state.brands, updatedCategory._id)
            setBrands(brands)
        }
  
        setFilter({
            ...state.filter,
            brands: [],
            category: updatedCategory,
            
        })
    }
    
    function handleChangeBrand(item: {name: string, _id: string}){
        let updatedBrands = [...state.filter.brands]
        
        let index = updatedBrands.findIndex(b=>b._id === item._id)
        
        if(index === -1){
            updatedBrands = [
                ...updatedBrands,
                item
            ]
        } else {
            updatedBrands.splice(index, 1)
        }        
        setFilter({
            ...state.filter,
            brands: updatedBrands
        })
    }
    

    function handleClick(e){
        handleExpandChildCategory(e)
    }


    function recursiveCategory(category, handleClick, filterCategory){
          return Object.keys(category) && Object.keys(category).map(key=>(
            <ul class="ml-4">
                <li>
                    <div 
                    onClick={()=>handleClick(category[key])} 
                    class={`flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2 pl-2 ${filterCategory && (category[key]._id === filterCategory._id ) ? "text-white bg-green-400" : ''} `}>
                        <label class="font-medium cursor-pointer" for={category[key]._id}>{category[key].name}</label>
                        {!category[key].parent_id && <FaSolidAngleRight /> }
                    </div>
                    
                    {(category[key].sub) && recursiveCategory(category[key].sub, handleClick, filterCategory) }
                </li>
            </ul>
        ))
    }

  return (
    <div class="hidden md:block col-span-3 ">
      <div class="grid px-4">
        <h1 class="font-bold text-2xl">Selected</h1>
        {state.filter?.category && <div class="flex flex-wrap gap-2 mt-4">
            <div
                onClick={() => handleChangeCategory(state.filter?.category)}
                class="bg-green-500/10 px-4 py-2 rounded flex justify-between">
                <span>{state.filter?.category.name}</span>
                <span class="ml-2 text-red-500 font-medium cursor-pointer">x</span>
            </div>
           
        </div> }

        <h1 class="font-bold text-2xl  mt-8">Category</h1>
            {recursiveCategory(categories(), handleClick, state.filter.category)}
      </div>

       <div class="grid px-4">
            <h1 class="font-bold text-2xl mt-8">Brands</h1>
            {/* Selected brands  */}
            {state.filter?.brands && <div class="flex flex-wrap gap-2 mt-4">
                <For each={state.filter.brands}>
                    {(brand)=>(
                        <div
                            onClick={() => handleChangeBrand(brand)}
                            class="bg-green-500/10 px-4 py-2 rounded flex justify-between">
                            <span>{brand.name}</span>
                            <span class="ml-2 text-red-500 font-medium cursor-pointer">x</span>
                        </div>
                    )}
                </For>
            
            </div> }

       
            {/* brand list */}
            <div class="">
                <For each={brands() ? brands() : state.brands} fallback={<div>Loading...</div>}>
                    {(item) => (
                        <li onClick={() => handleChangeBrand(item)} class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                            <label class="font-medium cursor-pointer">{item.name}</label>
                            <input checked={state.filter.brands && state.filter.brands.findIndex(b=> b._id === item._id) !== -1 } type="checkbox" />
                        </li>
                    )}
                </For>
            </div>
      </div>
    </div>
  );
}


export default Sidebar;


