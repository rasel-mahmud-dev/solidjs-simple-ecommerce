import { Component, createSignal, lazy, useContext } from "solid-js"
import { Link, useNavigate } from "@solidjs/router"
import { FaSolidLockOpen } from "solid-icons/fa"
import { AppContext } from 'store/index';
import Button from "components/Button";
const authActions = import("store/authActions")
import { AiOutlineGoogle } from 'solid-icons/ai'
import InputGroup from "components/inputs/InputGroup";
import {loginWithPassword} from "store/authActions";


const Login: Component = ()=>{

    const navigate = useNavigate()

    const [state, {login, setAlert, setAuthFetched}] =  useContext(AppContext)


    const [userData, setUserData] = createSignal({
        email: {value: "", errorMessage: ""},
        password: {value: "", errorMessage: ""}
    })

    function handleChange(e: any) {

        const { name, value } = e.target;
        let updateUserData = { ...userData() }
        updateUserData = {
            ...updateUserData,
            [name]: {
                ...updateUserData[name],
                value: value,
                tauch: true,
                errorMessage: updateUserData[name]
                    ? ""
                    : updateUserData[name].errorMessage,
            },
        };
        setUserData(updateUserData)
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        let payload: any = {}
        let isCompleted = true;

        let updateUserData: any = {...userData()}

        for (let key in updateUserData) {
            if (!updateUserData[key].value) {
                updateUserData[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                payload[key] = updateUserData[key].value
            }
        }

        if (!isCompleted) {
            setUserData(updateUserData)
            setAlert({isOpen: true, message: "Please fill all field", status: 500})
            return;
        }

        loginWithPassword(payload, (user, err)=>{
            if(err){
                setAlert({isOpen: true, message: err})
                return
            }
            if(state.authFetched.loadUrl) {
                setAuthFetched({isFetch: true, loadUrl: ""})
                navigate(state.authFetched.loadUrl)
            }
        })
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
        <div class="max-w-xl mx-auto px-4">
            <h1 class="text-center text-4xl font-bold">User Login</h1>
            <form onSubmit={handleSubmit} class="mt-10" >

                {/*********** EMail **************/}
                <InputGroup
                    name="email"
                    type="text"
                    label="Email"
                    placeholder="Enter Email"
                    onInput={handleChange}
                    reactiveState={userData}
                />
                {/*********** Password **************/}
                <InputGroup
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    onInput={handleChange}
                    reactiveState={userData}
                />

                <div class="mt-4">
                    <p class="font-medium">Not have a Account? 
                        <Link href="/auth/registration" class="text-blue-500 underline">Create an Account</Link>
                    </p>
                </div>


                <div id="recaptcha-container"></div>

                <div class="flex flex-col items-center justify-center mt-4">
                    <Button type="submit" >
                        <FaSolidLockOpen />
                        <h1 class="ml-1 font-medium">Login</h1>
                    </Button>

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


export default Login