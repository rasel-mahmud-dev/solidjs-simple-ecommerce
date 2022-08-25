import { Component, createSignal, lazy, useContext } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { FaSolidLockOpen } from "solid-icons/fa"
import { AppContext } from './../store/index';
import Button from "./Button";
const authActions = import("../store/authActions")


const Login: Component = ()=>{

    const navigate = useNavigate()

    const [state, {login}] =  useContext(AppContext)

    const [userData, setUserData]  = createSignal({
        email: "",
        password: ""
    })

    function handleChange(e: any){        
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

    async function handleGoogleLogin(){
        try{
            const {loginWithGoogle} = await authActions
            loginWithGoogle((user)=>{
                if(user){
                    // only for developmeent 
                    // login(user)
                    // localStorage.setItem("auth", JSON.stringify(user))
                    // navigate("/")
                }
            })
        } catch(ex){
            
        }
      }

    return (
        <div class="mx-4">
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

                <button type="submit" class="flex items-center mt-4 bg-green-500 text-white px-4 py-1.5 rounded text-lg">
                    <FaSolidLockOpen />
                    <h1 class="ml-1 font-medium">Login</h1>
                </button>

                <h1>Or</h1>

                <Button type="button" onClick={handleGoogleLogin}>Login With Google</Button>

            </form>
        </div>
    )
}


export default Login