import { Component, useContext } from "solid-js";
import { ProductType } from "../types";
import { AppContext } from "src/store/index";
import Button from "./Button";
import { FaSolidPen } from "solid-icons/fa";
import { Link } from "@solidjs/router";
import RatingStar from "./RatingStar";
import { BsTrash2Fill } from 'solid-icons/bs'

import isAdmin from "../utils/isAdmin";
import {addToCart} from "store/productActions";

const SingleProduct: Component<ProductType> = (props) => {
  const [state, { setCart, setAlert }] = useContext(AppContext);



  return (
    <div class="shadow-md flex justify-around flex-col p-4 relative">
        { state.auth && isAdmin(state.auth.email) && (
            <>
                <Link href={`/admin/update-product/${props.id}`}>
                    <div class="w-6 h-6 bg-green-500/20 cursor-pointer p-2 flex justify-center items-center rounded-full absolute right-2 top-2">
                        <FaSolidPen class="text-xs" />
                    </div>
                </Link>

                <div class="w-6 h-6 bg-green-500/20 cursor-pointer p-2 flex justify-center items-center rounded-full absolute right-2 top-9">
                    <BsTrash2Fill class="text-xs" />
                </div>
            </>
        )}

        <Link href={`/details/${props.id}`}>
          <div class="w-36 h-36 mx-auto">
            <img class="object-contain w-full h-full " src={props.image} alt="" />
          </div>
          <div>
            <h1 class="text-center mt-2">{props.title}</h1>
            <RatingStar rating={props.rating} class="justify-center mt-3" />
            <h3 class="text-center font-medium mt-1">${props.price}</h3>
            <Button class="mx-auto" onClick={() => addToCart(props, setCart, setAlert)}>
              Add To Cart
            </Button>
          </div>
      </Link>
    </div>
  );
};

export default SingleProduct;
