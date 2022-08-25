import { Component, createSignal, lazy, useContext } from "solid-js"
import { Link, useNavigate } from "@solidjs/router"
import { FaSolidLockOpen } from "solid-icons/fa"
import { AppContext } from 'store/index';
import Button from "components/Button";
const authActions = import("store/authActions")
import { AiOutlineGoogle } from 'solid-icons/ai'

const Registration: Component = ()=>{

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

                <div class="mt-4">
                    <p class="font-medium">Not have a Account? 
                        <Link href="/" class="text-blue-500 underline">Create an Account</Link>
                    </p>
                </div>

                <div class="flex flex-col items-center justify-center mt-4">
                    <button type="submit" class="flex items-center mt-4 bg-green-500 text-white px-4 py-1.5 rounded text-lg">
                        <FaSolidLockOpen />
                        <h1 class="ml-1 font-medium">Login</h1>
                    </button>

                    <h1 class="my-3">Or</h1>

                    <Button type="button" onClick={handleGoogleLogin} class="bg-red-500/90 hover:bg-red-600">
                        <AiOutlineGoogle class="text-white text-xl" />
                            <span class="ml-1">Login With Google</span>
                        </Button>
                </div>


            </form>
        </div>
    )
}


export default Registration