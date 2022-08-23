import { createEffect } from "solid-js";


function InputGroup({name, type, label, value, inputClass, labelClass, errorMessage, placeholder, onChange, className}) {

    createEffect(() => {
        console.log("The count is now", value);
      }, value);

  return (
        <div class={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <h1>{value}</h1>
            
            { label && <label for={name}  class={`${labelClass} block w-40 font-medium text-gray-900 mb-2 md:mb-0`} >{label}</label> }
            <div class="w-full">
                <input 
                    name={name}
                    value={value} 
                    type={type} 
                    id={name}
                    placeholder={placeholder} 
                    onInput={onChange}
                    class={`${inputClass} border-[1.5px] border-green-500/90 rounded px-2 py-1 w-full placeholder:text-gray-700 text-gray-800 outline-none`}
                />
                <div class="mt-1">
                    {errorMessage && <span class="rounded-md text-error">{errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default InputGroup