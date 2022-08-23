import { Component, lazy } from "solid-js";
import { useContext } from "solid-js";
import { AppContext } from "src/store/index";
import { createEffect } from "solid-js";

import InputGroup from "src/components/inputs/InputGroup";

// import { getDocs, getFirestore, collection } from "firebase/firestore";

// const firebaseInit = import("src/firebase/init")
import { createSignal } from "solid-js";
import TextArea from "components/inputs/TextArea";
import Button from "components/Button";

const AddProduct: Component = (props) => {
  const [{ alertMessage }, {  login, setAlert }] = useContext(AppContext);

  // Initialize Cloud Firestore and get a reference to the service

  createEffect(async () => {}, 0);

  async function addProduct() {
    let products = await Product.findAll();
    console.log(products);

    // let p = new Product({
    //   title: "ASDD",
    //   price: 123,
    //   description: "ASD",
    //   image: "ASD",
    //   rating: {},
    //   category: "ASD"

    // })
    // console.log(p);
  }
  const [state, setState] = createSignal({
    productData: {
      title: { value: "", errorMessage: "", tauch: false },
      category: { value: "", errorMessage: "", tauch: false }, // id
      image: { value: null, blob: null, errorMessage: "", tauch: false },
      price: { value: "", errorMessage: "", tauch: false },
      description: { value: "", errorMessage: "", tauch: false },
    },
    addMovieModal: "", // addGenre | addLanguage |  addQuality
    httpResponse: "",
    httpStatus: 0,
  });

  function handleChange(e: any) {
    const { name, value } = e.target;

    let updateProductData = {
        ...state().productData
    }

    updateProductData = {
      ...state().productData,
      [name]: {
        ...updateProductData[name],
        value: value,
        tauch: true,
        errorMessage: updateProductData[name]
          ? ""
          : updateProductData[name].errorMessage,
      },
    };

    setState((state) => {
      return {
        ...state,
        productData: {...state.productData, ...updateProductData},
      };
    });
  }

  function handleSaveProduct(e: SubmitEvent) {
    e.preventDefault();

    let payload = {}


    let isCompleted = true;

    let updatedState = {...state().productData}

    const productDataPayload = state().productData

    for (let key in productDataPayload) {
        
        if (key === "image") {
            // if (!movieDataPayload[key].tauch || !movieDataPayload[key].value) {
            //     updatedState[key].errorMessage = `${key} is required`
            //     isCompleted = false;
            // } else {
            //     // only check when image is blob data;
            //     if (!params.id) {
            //         if (movieDataPayload[key].value.size > "102400") { // 100kb
            //             updatedState[key].errorMessage = `${key} size should be under 100kb`
            //             isCompleted = false;
            //         }
            //     }
            // }

        } else {
            if (!productDataPayload[key].tauch || !productDataPayload[key].value) {
                updatedState[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                payload[key] = productDataPayload[key].value
            }
        }
    }
    
 
    setState((state) => {
        return {
          ...state,
          productData: updatedState,
        };
    });


    if (!isCompleted) {
        setAlert({isOpen: true, message: "Please fill all field", status: 500}) 
        return;
    }

  }

  return (
    <div class="max-w-xl mx-auto">
      <form onSubmit={handleSaveProduct}>
        {/*********** Title **************/}
        <InputGroup
          name="title"
          type="text"
          label="Title"
          placeholder="Enter movie title"
          onChange={handleChange}
          value={state().productData.title.value}
          errorMessage={state().productData.title.errorMessage}
        />
        {/*********** Price **************/}
        <InputGroup
          name="price"
          type="number"
          label="Price"
          placeholder="Enter Product price"
          onChange={handleChange}
          value={state().productData.price.value}
          errorMessage={state().productData.price.errorMessage}
        />

        {/*********** Category **************/}
        <InputGroup
          name="category"
          type="text"
          label="category"
          placeholder="Enter category"
          onChange={handleChange}
          value={state().productData.category.value}
          errorMessage={state().productData.category.errorMessage}
        />

        {/*********** description **************/}
        <TextArea
          name="description"
          label="description"
          placeholder="Enter description"
          onChange={handleChange}
          value={state().productData.description.value}
          errorMessage={state().productData.description.errorMessage}
        />
       
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
