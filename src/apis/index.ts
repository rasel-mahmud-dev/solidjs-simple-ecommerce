// export const api = "https://fakestoreapi.com/products"
 
export const api = import.meta.env.DEV ?  "http://localhost:1000"  : "https://fakestoreapi.com"
