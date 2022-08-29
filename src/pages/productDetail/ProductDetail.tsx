import { useParams } from "@solidjs/router"
import { createSignal, createEffect, useContext } from "solid-js"
const ProductModel =  import("src/models/ProductModel")
import RatingStar from "components/RatingStar"
import { ProductType } from 'src/types';
import Button from "components/Button";
import {addToCart} from "store/productActions";

import {AppContext} from "store/index";

const ProductDetail = () => {

  const [state, {setCart, setAlert}] = useContext(AppContext)

let params = useParams()
  
  // Initialize Cloud Firestore and get a reference to the service

  const [productDetails, setProductDetails] = createSignal<ProductType | null>(null)



  createEffect(async()=>{
    if(params.id){
      const {default: Product}= await ProductModel
      let product = await Product.findOne(params.id)
      setProductDetails(product)
    }
  })


  return (
    <div class="max-w-screen-xl mx-auto px-4">

        <div>
            { productDetails()  && (
                <div class="block md:grid grid-cols-12 gap-x-8">
                    <div class="col-span-3 w-52 md:w-auto mx-auto md:mx-0">
                        <img class="w-full" src={productDetails()?.image} alt="" srcset="" />

                        <div class="flex gap-x-6 mt-6">
                            <Button class="whitespace-nowrap" onClick={() => addToCart(productDetails, setCart, setAlert)}>Add To Cart</Button>
                            <Button class="whitespace-nowrap w-full justify-center">Buy Now</Button>
                        </div>

                    </div>

                    <div class="col-span-9 mt-10 md:mt-0">
                        <h1 class="text-xl font-bold text-neutral-800 ">{productDetails()?.title}</h1>

                        <li class="list-none mt-4">
                            <div class="font-medium">Price</div>
                            <h1>${productDetails()?.price}</h1>
                        </li>

                        <li class="list-none mt-4">
                            <div class="font-medium">Rating</div>
                            <span class="flex items-center">
                                <span class="font-medium bg-green-500 px-3 text-white rounded">{productDetails()?.rating.rate}</span>
                                <RatingStar rating={productDetails()?.rating} class="ml-2" />
                            </span>
                            <span class="flex items-center mt-2">
                                <span class="font-medium text-neutral-800">{productDetails()?.rating.count}</span>
                                <span class="font-medium text-neutral-900 ml-2">Reviews</span>
                            </span>
                            
                        </li>

                        <li class="list-none mt-4">
                            <div class="font-medium">Description</div>
                            <p class="whitespace-pre-line">{productDetails()?.description}</p>
                        </li>
                        
                    </div>
                </div>
            ) }            
        </div>
    </div>
  )
}

export default ProductDetail