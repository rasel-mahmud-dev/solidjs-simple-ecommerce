import { FaSolidAngleRight } from "solid-icons/fa";
import { createEffect, createSignal, For, on, onMount } from "solid-js";


function Sidebar({ state }) {

    function handleChangeCategory(){

    }

    const [categories, setCategories] = createSignal(
        {
           
                // "60df5e546419f56b97610600": {
                //     "_id": "60df5e546419f56b97610600",
                //     "name": "Electronics",
                //     "parent_id": null,
                //     "sub": {
                //         "60e00694402ddf2ba7d26d43": {
                //             "_id": "60e00694402ddf2ba7d26d43",
                //             "parent_id": "60df5e546419f56b97610600",
                //             "name": "Computer and Laptop Accessories"
                //         },
                //         "60e0131fc4db28b79bb36aa3": {
                //             "_id": "60e0131fc4db28b79bb36aa3",
                //             "name": "Mobiles and Tablet",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "613ae2344b72d984efe8c45b": {
                //             "_id": "613ae2344b72d984efe8c45b",
                //             "name": "monitors",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489843841259e4451165e0": {
                //             "_id": "61489843841259e4451165e0",
                //             "name": "Audio & Video",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489c1f841259e4451165e7": {
                //             "_id": "61489c1f841259e4451165e7",
                //             "name": "Cameras & Accessories",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489d4e841259e4451165f2": {
                //             "_id": "61489d4e841259e4451165f2",
                //             "name": "Television.",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489d4e841259e4451165f3": {
                //             "_id": "61489d4e841259e4451165f3",
                //             "name": "Washing Machine",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489d4e841259e4451165f4": {
                //             "_id": "61489d4e841259e4451165f4",
                //             "name": "Refrigerators",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489d4e841259e4451165f5": {
                //             "_id": "61489d4e841259e4451165f5",
                //             "name": "Kitchen Appliances",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "61489e7a841259e4451165f9": {
                //             "_id": "61489e7a841259e4451165f9",
                //             "name": "Home Appliances",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "6148a0bd841259e4451165fd": {
                //             "_id": "6148a0bd841259e4451165fd",
                //             "name": "Home Appliances",
                //             "parent_id": "60df5e546419f56b97610600"
                //         },
                //         "616f14298ae9a90aa4434f75": {
                //             "_id": "616f14298ae9a90aa4434f75",
                //             "name": "DTH",
                //             "parent_id": "60df5e546419f56b97610600"
                //         }
                //     }
                // }
            }
       
    );

   
    
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

        // let isLastSub = false
        // find last deepth sub item and push inside as sub items
        let clickNestedLastItem = findNestedLastItem({...updateCategory}, item._id)

   

        if(clickNestedLastItem.sub){
            clickNestedLastItem.sub =  {...clickNestedLastItem.sub, ...sub} 
        } else{
            clickNestedLastItem.sub = sub
        }
        
        setCategories(updateCategory)
        return
    }

    createEffect(()=>{
        setCategories(findRootCategories(state.categories))
    }, state.categories)    



    function findNestedLastItem(obj, id){
        for (const key in obj) {
            if(key !== id){
                if(obj[key].sub){
                    return findNestedLastItem(obj[key].sub, id)
                } 
            } else{
                return obj[key]
            }
            
        }
    }
    
    

    function handleClick(e){
        handleExpandChildCategory(e)
    }


    function recursiveCategory(category, handleClick){
          return Object.keys(category) && Object.keys(category).map(key=>(
            <ul class="ml-4">
                <li>
                    <div onClick={()=>handleClick(category[key])} class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                        <label class="font-medium cursor-pointer" for={category[key]._id}>{category[key].name}</label>
                        <FaSolidAngleRight />
                    </div>
                    
                    {(category[key].sub) && recursiveCategory(category[key].sub, handleClick) }
                </li>
            </ul>
        ))
    }

  return (
    <div class="hidden md:block col-span-3 ">
      <div class="grid px-4">
        <h1 class="font-bold text-2xl">Selected</h1>
        <div class="flex flex-wrap gap-2 mt-4">
          <For each={state.filter?.category}>
            {(item) => (
              <div
                onClick={() => handleChangeCategory(item)}
                class="bg-green-500/10 px-4 py-2 rounded flex justify-between">
                <span>{item}</span>
                <span class="ml-2 text-red-500 font-medium cursor-pointer">x</span>
              </div>
            )}
          </For>
        </div>

        <h1 class="font-bold text-2xl  mt-8">Category</h1>
        {/* <Category category={store.categories} handleClick={handleExpandChildCategory} /> */}
            {recursiveCategory(categories(), handleClick)}
      </div>

        <h1 class="font-bold text-2xl  mt-8">Brands</h1>
        <div class="mt-4">
          <For each={state.brands} fallback={<div>Loading...</div>}>
            {(item) => (
              <li class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                <label class="font-medium cursor-pointer" for={item.name}>
                  {item.name}
                </label>
                <input
                  checked={state?.filter?.category?.includes(item.name)}
                  onChange={() => handleChangeCategory(item.name)}
                  type="checkbox"
                  id={item.name}
                />
              </li>
            )}
          </For>
        
      </div>
    </div>
  );
}


// recursion for render category

interface CategoryType {
    category: {[key: string]: {
        name: string, 
        _id: string, 
        sub: CategoryType
    }
    },
    handleClick: any
}

const Category = (props: { category: CategoryType })=>{

    let category = props.category
    
    return Object.keys(category) && Object.keys(category).map(key=>(
        <ul class="ml-4">
            <li>
                <div onClick={()=>props.handleClick(category[key])} class="flex justify-between items-center hover:text-green-400 cursor-pointer select-none my-2">
                    <label class="font-medium cursor-pointer" for={category[key]._id}>{category[key].name}</label>
                    <FaSolidAngleRight />
                </div>
                
                {(category[key].sub) && <Category handleClick={props.handleClick} category={category[key].sub} /> }
            </li>
        </ul>
    ))
}


export default Sidebar;


