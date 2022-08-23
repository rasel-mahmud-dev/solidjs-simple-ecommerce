import { createContext, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";

interface AppStateType {
  products: null | {title: string}[],
  auth: {email: string} | null,
  cart: {title: string}[] | null
  alertMessage: {isOpen: boolean, message?: string | JSXElement, status: 200 | 500}
}

export const AppContext = createContext([{ products: null, auth: null, cart: [] || null }, {}]);

export function AppProvider(props) {

    const [state, setState] = createStore<AppStateType>({
      products: [],
      auth: null,
      cart: null,
      alertMessage: {isOpen: true, message: "Product Add to Cart", status: 200}
     });
    
    const appState: {state: AppStateType, actions: {} } = [
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

