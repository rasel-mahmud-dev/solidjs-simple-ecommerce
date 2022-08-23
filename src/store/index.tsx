import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

interface AppStateType {
  products: null | {title: string}[],
  auth: {email: string} | null,
  cart: {title: string}[] | null
}

export const AppContext = createContext([{ products: null, auth: null, cart: [] || null }, {}]);

export function AppProvider(props) {

    const [state, setState] = createStore<AppStateType>({
      products: [],
      auth: null,
      cart: null,
     });
    
    const appState = [
      state,
      {
        setProducts: function(productsData){
          setState("products", (products)=> products = productsData)
        },
        
        login: function(data){
          setState("auth", (auth)=> auth = data)
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
        }
      },
    ];
  
    


    return (
      <AppContext.Provider value={appState}>
         {props.children}
       </AppContext.Provider>
    );
  }

