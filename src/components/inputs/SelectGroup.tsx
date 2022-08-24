
import { Component, JSX } from 'solid-js';
import { JSXElement } from 'solid-js';

interface Props extends JSX.InputHTMLAttributes<HTMLSelectElement> {
    name: string 
    reactiveState: ()=> { [key: string]: {value?: string | number, errorMessage?: string}} | any
    label?: string 
    inputClass?: string 
    labelClass?: string 
    onInput: (e: any)=> void 
    className?: string
    options: ()=> JSXElement
}


const SelectGroup:Component<Props> = ({name, reactiveState, type, label, inputClass, labelClass,  onInput, className, options, ...attr}) =>{
    return (
        <div class={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            { label && <label for={name}  class={`${labelClass} block w-40 font-medium text-gray-900 mb-2 md:mb-0`} >{label}</label> }
            <div class="w-full">
                <select class={`${inputClass} border-[1.5px] border-green-500/90 rounded px-2 py-1 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                    {...attr}
                    name={name}
                    value={reactiveState()[name]?.value} 
                    id={name}
                    oninput={onInput}>
                    {options()}
                </select>
                <div class="mt-1">
                    {reactiveState()[name]?.errorMessage && <span class="text-red-500 ">{reactiveState()[name].errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default SelectGroup