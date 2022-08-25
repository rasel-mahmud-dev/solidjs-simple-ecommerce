const ProductModal = import("src/models/ProductModel")

export async function filterProducts(payload){

    let {default: ProductM} = await ProductModal

    const {products, filter: { category, brands }} = payload
   
    if(!products){
        return []
    }
    
    if(category && brands.length > 0){
        console.log("filter with brand and category");
        
        let result = []
        products.map(product=> {
            let tempProd;
            if(brands.findIndex(b=> b._id === product.brandId) !== -1 ){
                tempProd = product;
            }
            if(tempProd && tempProd.categoryId && tempProd.categoryId === category._id){
                result.push(tempProd)
            }
        })
        return result

     } else if(category){
            console.log("filter with categories");
            const items = await ProductM.query({categoryId: category._id})

            // let items = products.filter(product=> product.categoryId === category._id)
            return items
        
    } else{
        if(brands.length > 0){
            console.log("filter with brands");
            let result = []
            products.map(product=> {
                if(brands.findIndex(b=>b._id === product.brandId) !== -1){
                    result.push(product)
                }
            })
            return result
        }
    }

}





// export function fetchProduct(id){
//     retyrb 
// }