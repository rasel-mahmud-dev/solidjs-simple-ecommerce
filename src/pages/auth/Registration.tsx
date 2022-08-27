import {Component, createSignal, lazy, useContext} from "solid-js"
import {Link, useNavigate} from "@solidjs/router"
import {FaSolidLockOpen} from "solid-icons/fa"
import {AppContext} from 'store/index';
import Button from "components/Button";

const authActions = import("store/authActions")
import {AiOutlineGoogle} from 'solid-icons/ai'
import InputGroup from "components/inputs/InputGroup";
import {findCategoryBrand} from "../../utils";
import ProductModel from "../../models/ProductModel";

const Registration: Component = () => {

  const navigate = useNavigate()

  const [state, {login, setAlert}] = useContext(AppContext)


  const [userData, setUserData] = createSignal({
    username: {value: "", errorMessage: ""},
    email: {value: "", errorMessage: ""},
    password: {value: "", errorMessage: ""},
    confirmPassword: {value: "", errorMessage: ""}
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


        // const {default: Product} = await ProductModel

        // let data = {
        //     title: payload.title,
        //     price: payload.price,
        //     description: payload.description,
        //     image: payload.image,
        //     rating: {rate: 4, count: 10},
        //     categoryId: payload.categoryId,
        //     brandId: payload.brandId
        // }

        // let p = new Product(data)
        //
        // let res = await p.save()
    }



  return (
      <div class="max-w-xl mx-auto px-4">
        <h1 class="text-center text-4xl font-bold">Create an Account </h1>

        <form onSubmit={handleSubmit} class="mt-10">

          <div class="">
            {/*********** Username **************/}
            <InputGroup
                name="username"
                type="text"
                label="Username"
                placeholder="Enter Username"
                onInput={handleChange}
                reactiveState={userData}
            />

            {/*********** EMail **************/}
            <InputGroup
                name="email"
                type="text"
                label="Email"
                placeholder="Enter E-mail"
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
            {/*********** Re-Password **************/}
            <InputGroup
                name="confirmPassword"
                type="password"
                label="Re-Password"
                placeholder="Enter Confirm password"
                onInput={handleChange}
                reactiveState={userData}
            />
          </div>

          <div class="mt-4">
            <p class="font-medium">Not have a Account?
              <Link href="/auth/login" class="text-blue-500 underline ml-1">Login</Link>
            </p>
          </div>

          <button type="submit" class="flex items-center mt-4 bg-green-500 text-white px-4 py-1.5 rounded text-lg">
            <FaSolidLockOpen/>
            <span class="ml-1 font-medium">Login</span>
          </button>

        </form>
      </div>
  )
}


export default Registration