import { JSX } from "solid-js"


interface Props extends JSX.HTMLAttributes<HTMLTextAreaElement> {
    name: string 
    reactiveState: ()=> { [key: string]: {value?: string | number, errorMessage?: string}}  | {}
    label?: string 
    inputClass?: string 
    labelClass?: string 
    onInput: (e: any)=> void 
    className?: string
    placeholder?: string
}

function TextArea({name, label, reactiveState, inputClass, placeholder, onInput, className}: Props) {
  return (
        <div class={`mt-4 flex items-start flex-col md:flex-row ${className}`} >
            {label && <label for={name}  class="block w-40 font-medium text-gray-900 mb-2 md:mb-0" >{label}</label> }
            <div class="w-full">
                <textarea 
                    name={name}
                    value={reactiveState()[name]?.value} 
                    id={name}
                    placeholder={placeholder} 
                    onInput={onInput}
                    class={`input ${inputClass} text-[15px] h-20  rounded px-2 py-1.5 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                ></textarea>
                <div class="mt-0">
                    {reactiveState()[name]?.errorMessage && <span class="rounded-md text-red-500">{reactiveState()[name].errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default TextArea