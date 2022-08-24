


const Alert = ({class:className, message, status}) => {
  return (
    <div class={`${className} ${status === 200 ? 'bg-green-500' : 'bg-red-400'} px-14 py-3 fixed top-20 z-20 shadow-1 max-w-md right-12 `}>
        <div class="text-white">
        {message ? message  : "" }
        </div>
    </div>
  )
}


export default Alert