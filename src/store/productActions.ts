export function filterProducts(payload){
    const {products, filter: { category, brands }} = payload
    if(category){
        let items = products.filter(product=> product.categoryId === category._id)
        return items
    }
}