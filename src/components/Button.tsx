
import { Component, JSXElement } from 'solid-js';

const Button:Component<{class?: string, children?: JSXElement | string, attr?: Attr}> = (props)=>{
    const {class:className, ...attr} = props
  return (
    <button {...attr} class={`flex items-center mt-4 bg-green-500 text-white font-medium text-[15px] px-4 py-1.5 rounded text-lg ${className}`}>
    
    {props.children}
</button>
  )
}

export default Button
