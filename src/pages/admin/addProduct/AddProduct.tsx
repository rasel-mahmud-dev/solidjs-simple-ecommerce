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
import { Product } from "src/models/Product";

const AddProduct: Component = (props) => {
  const [{ alertMessage }, {  login, setAlert }] = useContext(AppContext);

  // Initialize Cloud Firestore and get a reference to the service

  createEffect(async () => {}, 0);

  async function addProduct(payload) {
    // let products = await Product.findAll();

    let p = new Product({
      title: payload.title,
      price: payload.price,
      description: payload.description,
      image: "",
      rating: {rate: 4, count: 10},
      category: payload.category

    })
    console.log(p);
    
  }

  const [productData, setProductData] = createSignal({
        title: { value: "", errorMessage: "", tauch: false },
        category: { value: "", errorMessage: "", tauch: false }, // id
        image: { value: null, blob: null, errorMessage: "", tauch: false },
        price: { value: "", errorMessage: "", tauch: false },
        description: { value: "", errorMessage: "", tauch: false },
   
  })


  const [state, setState] = createSignal({
    addMovieModal: "", // addGenre | addLanguage |  addQuality
    httpResponse: "",
    httpStatus: 0,
  });


  function handleChange(e: any) {

    const { name, value } = e.target;
    let updateProductData = {
        ...productData()
    }

    updateProductData = {
      ...updateProductData,
      [name]: {
        ...updateProductData[name],
        value: value,
        tauch: true,
        errorMessage: updateProductData[name]
          ? ""
          : updateProductData[name].errorMessage,
      },
    };


    setProductData(() => updateProductData);
  }

  function handleSaveProduct(e: SubmitEvent) {
    e.preventDefault();

    let payload = {}


    let isCompleted = true;

    let updatedState = {...productData()}

    const productDataPayload = productData()

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
            if (!productDataPayload[key].value) {
                updatedState[key].errorMessage = `${key} is required`
                isCompleted = false;
                
            } else {
                payload[key] = productDataPayload[key].value
            }
        }
    }

 
    setProductData(() => updatedState);


    if (!isCompleted) {
        setAlert({isOpen: true, message: "Please fill all field", status: 500}) 
        return;
    }

    addProduct(payload)
    



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
          onInput={handleChange}
          reactiveState={productData}
        />
        {/*********** Price **************/}
         <InputGroup
          name="price"
          type="number"
          label="Price"
          placeholder="Enter Product price"
          onInput={handleChange}
          reactiveState={productData}
        />

        {/*********** Category **************/}
        <InputGroup
          name="category"
          type="text"
          label="category"
          placeholder="Enter category"
          onInput={handleChange}
          reactiveState={productData}
        />

        {/*********** description **************/}
        <TextArea
          name="description"
          label="description"
          placeholder="Enter description"
          onInput={handleChange}
          reactiveState={productData}
        /> 
       
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
