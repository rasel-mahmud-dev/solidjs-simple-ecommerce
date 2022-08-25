export interface ProductType  {
    title: string,
    price: number,
    description: string,
    id: string,
    image: string
    rating: {rate: number, count: number},
    categoryId: string
    brandId: string
    createdAt: Date
}