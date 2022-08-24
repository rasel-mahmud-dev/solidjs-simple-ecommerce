import { Component,  useContext } from "solid-js"
import { ProductType } from "../types";
import { AppContext } from '../store/index';
import Button from "./Button";




const SingleProduct:Component<ProductType> = (props)=> {

    const [state, {setCart, setAlert}] = useContext(AppContext)

    function handleAddTpCart(item){
        setCart({
            id: item.id,
            image: item.image,
            title: item.title,
            price: item.price
        })
        setAlert({
            isOpen: true, message: <h1 class="text-white">Product Add to Cart...</h1>, status: 200
        })
    }   

    


    return (
        <div class="shadow-md flex justify-around flex-col items-center p-4">
           
                <div class="w-36 h-36">
                    <img class="object-contain w-full h-full " src={props.image} alt="" />
                </div>
                <div>
                <h1 class="text-center mt-2">{props.title}</h1>
                {/* <p>{props.description}</p> */}
                <h3 class="text-center font-medium mt-2">${props.price}</h3>
                <Button class="mx-auto" onClick={()=>handleAddTpCart(props)}>Add To Cart</Button>
           
        </div>
        </div>
    )
}

export default SingleProduct