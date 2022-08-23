
function TextArea({name, label, value, inputClass, errorMessage, placeholder, onChange, className}) {
  return (
        <div class={`mt-4 flex items-start flex-col md:flex-row ${className}`} >
            {label && <label for={name}  class="block w-40 font-medium text-gray-900 mb-2 md:mb-0" >{label}</label> }
            <div class="w-full">
                <textarea 
                    name={name}
                    value={value} 
                    id={name}
                    placeholder={placeholder} 
                    onInput={onChange}
                    class={`border-[1.5px] border-green-500/90 rounded px-2 py-1 w-full placeholder:text-gray-700 text-gray-800 outline-none h-32  ${inputClass}`} 
                ></textarea>
                <div class="mt-1">
                    {errorMessage && <span class="rounded-md text-error ">{errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default TextArea