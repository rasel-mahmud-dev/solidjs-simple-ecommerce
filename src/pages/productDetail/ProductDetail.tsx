import { useParams } from "@solidjs/router"
import { createSignal, createEffect } from "solid-js"
const ProductModel =  import("src/models/ProductModel")
import RatingStar from "components/RatingStar"

const ProductDetail = () => {

let params = useParams()
  
  // Initialize Cloud Firestore and get a reference to the service

  const [productDetails, setProductDetails] = createSignal(null)

  

  createEffect(async()=>{
    if(params.id){
      const {default: Product}= await ProductModel
      let product = await Product.findOne(params.id)
      console.log(product);
      
      setProductDetails(product)
    }
  })
  
  

  return (
    <div class="max-w-screen-xl mx-auto px-4">

        <div>
            { productDetails()  && (
                <div class="flex">
                    <div class="w-32">
                        <img src={productDetails().image} alt="" srcset="" />
                    </div>
                    <div class="ml-10">
                        <h1 class="text-md font-medium">{productDetails().title}</h1>
                        <h1>${productDetails().price}</h1>

                        <RatingStar rating={productDetails().rating} />
                    </div>
                </div>
            ) }            
        </div>
    </div>
  )
}

export default ProductDetail