import { Component, createSignal, useContext} from "solid-js"
import {  useNavigate } from "@solidjs/router"
import {FaSolidLockOpen} from "solid-icons/fa"
import { AppContext } from './../store/index';


const Login: Component = ()=>{

    const navigate = useNavigate()

    const [state, {login}] =  useContext(AppContext)

    const [userData, setUserData]  = createSignal({
        email: "",
        password: ""
    })

    function handleChange(e: any){
        console.log([e.target.name]);
        
        setUserData(prev=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    function handleSubmit(e: SubmitEvent){
        const a = userData()        
     
        e.preventDefault();
        if(a.email === "rasel.mahmud.dev@gmail.com" && a.password === "1"){
            login(a)
            navigate("/")
        } else{
            alert("Wrong password")
        }
    }

    return (
        <div>
            <h1 class="text-center text-4xl font-bold">User Login</h1>
            <form onSubmit={handleSubmit} class="max-w-md mx-auto mt-10" >
                <div class="flex items-center">
                    <label class="w-32 block" for="email">Email</label>
                    <input 
                        onInput={handleChange}
                        placeholder="Email" 
                        class="border border-green-500 w-full rounded outline-none px-3 py-1.5"  
                        type="email" 
                        name="email" 
                        value={userData().email}
                        id="email" />
                </div>
                <div class="flex items-center mt-4">
                    <label class="w-32 block" for="email">Password</label>
                    <input 
                        onInput={handleChange}
                        placeholder="Password" 
                        value={userData().password}
                        class="border border-green-500 w-full rounded outline-none px-3 py-1.5"  
                        type="password" 
                        name="password" 
                        id="password" />
                </div>
                
                <h1>{Date.now()} {userData().email}</h1>

                <button class="flex items-center mt-4 bg-green-500 text-white px-4 py-1.5 rounded text-lg">
                    <FaSolidLockOpen />
                    <h1 class="ml-1 font-medium">Login</h1>
                </button>
            </form>
        </div>
    )
}


export default Login