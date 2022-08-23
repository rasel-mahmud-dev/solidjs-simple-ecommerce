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

    const [state, {setCart}] = useContext(AppContext)

    function handleAddTpCart(item){
        setCart({
            id: item.id,
            image: item.image,
            title: item.title,
            price: item.price
        })
    }   


    return (
        <div class="shadow-md flex justify-around flex-col items-center p-4">
           
                <div class="w-36 h-36">
                    <img class="object-contain w-full h-full " src={props.image} alt="" />

                </div>
                <div>
                <h1>{props.title}</h1>
                {/* <p>{props.description}</p> */}
                <h3>{props.price}</h3>
                <Button onClick={()=>handleAddTpCart(props)}>Add To Cart</Button>
           
        </div>
        </div>
    )
}

export default Product