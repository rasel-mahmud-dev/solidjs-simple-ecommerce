const ProductModal = import("src/models/ProductModel")

export async function filterProducts(payload){

    let {default: ProductM} = await ProductModal

    const {products, filter: { category, brands }} = payload
   
    if(!products){
        return []
    }
    
    if(category && brands.length > 0){
        console.log("filter with brand and category");
        
        const items = await ProductM.query({categoryId: category._id, brandIds: brandQueryPayload(brands)})
        return items

     } else if(category){
            const items = await ProductM.query({categoryId: category._id})
            return items
        
    } else{
        const items = await ProductM.query({brandIds: brandQueryPayload(brands)})
        return items
    }
}

function brandQueryPayload(brands: {_id:string}[]){
    if(brands.length > 0){
        console.log("filter with brands");
        let ids: any = brands.map(b=>b._id)
        if(!ids || ids.length === 0){
            ids = undefined
        }
       return ids
    }
}



export function addToCart(item, setCart, setAlert){

    setCart({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
    });
    setAlert({
        isOpen: true,
        message: <h1 class="text-white">Product Add to Cart...</h1>,
        status: 200,
    });



}