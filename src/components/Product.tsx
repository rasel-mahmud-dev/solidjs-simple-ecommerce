import { Component, createSignal, createEffect, useContext } from "solid-js"
import { AppContext } from './../store/index';
import Button from "./Button";


interface ProductProps  {
    title: string,
    price: number,
    description: string,
    id: number,
    image: string
    rating: {},
    category: string
}

const Product:Component<ProductProps> = (props)=> {

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
                <h3 class="text-center font-medium mt-2">{props.price}</h3>
                <Button class="mx-auto" onClick={()=>handleAddTpCart(props)}>Add To Cart</Button>
           
        </div>
        </div>
    )
}

export default Product