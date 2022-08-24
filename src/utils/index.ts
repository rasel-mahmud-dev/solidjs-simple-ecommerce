export function findCategoryBrand(brands, categoryId){
    let result = []
    brands.forEach(brand=>{
        if(brand.categoryIds && brand.categoryIds.indexOf(categoryId) !== -1){
            result.push(brand)
        }
    })
    return  result
}
