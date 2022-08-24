import { createContext, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";

import categories from "src/assets/categories.json"
import brands from "src/assets/brands.json"
import { ProductType } from './../types/index';

interface AppStateType {
  products: null | ProductType[],
  filteredProducts: null | {title: string}[],
  auth: {email: string} | null,
  cart: {title: string}[] | null
  alertMessage: {isOpen: boolean, message?: string | JSXElement, status: 200 | 500},
  searchValue?: string,
  categories: {name: string}[]
  brands: {name: string}[]
  filter: {
    category: {name: string, _id: string} | null;
    brands: {name: string, _id: string}[]
  }
}

export const AppContext = createContext([{ products: null, auth: null, cart: [] || null }, {}]);

export function AppProvider(props) {

    const [state, setState] = createStore<AppStateType>({
      products: null,
      filteredProducts: null,
      auth: null,
      cart: null,
      searchValue: "",
      alertMessage: {isOpen: false, message: "", status: 200},
      filter: {
        category: null,
        brands: []
      },
      categories: categories,
      brands: brands
      //  [
          // {
          //     "name": "men's clothing"
          // },
          // {
          //     "name": "jewelery"
          // },
          // {
          //     "name": "electronics"
          // },
          // {
          //     "name": "women's clothing"
          // }
      // ]
     });
    
    const appState: {state: AppStateType, actions: {} } = [
      state,
      {
        setProducts: function(productsData){
          setState("products", ()=> productsData)
        },

        setFilteredProducts: function(productsData){          
          setState("filteredProducts", ()=> productsData)
        },

        setFilter: function(filterPayload){                    
          setState("filter", (filter)=> {
            return {
              ...filter,
              category: filterPayload.category,
              brands: filterPayload.brands
            }
          })
        },

        login: function(payload: object | null){
          setState("auth", ()=>  payload)
        },

        setSearchValue: function(payload: string){
          setState("searchValue", ()=> payload)
        },

        setCart: function(item){          
          setState("cart", function(cart){

            let updateCart = {...cart}

            if(item.id in updateCart){
              updateCart[item.id] = {
                ...updateCart[item.id],
                quantity: updateCart[item.id].quantity + 1
              }
            } else{
              updateCart[item.id] = {
                ...item,
                quantity: 1,
              }
            }
            return updateCart
          })
        },

        setAlert: function(alertData: {isOpen: true, message?: string | JSXElement, status: 200}){          
          setTimeout(()=>{
            setState("alertMessage", function(alertMessage){
              return {
                ...alertMessage,
                isOpen: false,
              }
            })
          }, 1000)
          setState("alertMessage", function(alertMessage){
            return {
              ...alertMessage,
              ...alertData
            }
          })
        }

      },
    ];
  
    


    return (
      <AppContext.Provider value={appState}>
         {props.children}
       </AppContext.Provider>
    );
  }

