import { AiFillStar } from "solid-icons/ai"
import { Component, JSX } from 'solid-js';

interface Props extends  JSX.InputHTMLAttributes<HTMLDivElement> {
    rating: {rate: number}
}

const RatingStar: Component<Props> =({rating, class:className, ...atrr})=>{
    return(
     
            <div class={`flex ${className}`} {...atrr}  >
            { new Array(5).fill(1).map((item, index)=>(
                <div class="relative">
                    <AiFillStar class={`${rating.rate <= (index + 1) ? "text-neutral-200" : " text-transparent"} `} />
                    <span class="absolute top-0">
                    { rating.rate >= (index + 1) && <AiFillStar class="text-orange-400" />  }
                    </span>
                </div>
            )) }
        </div>
   
    )
  }

  export default RatingStar