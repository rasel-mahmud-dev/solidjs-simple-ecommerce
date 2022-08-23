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
import Product from "src/models/Product";

const AddProduct: Component = (props) => {
  const [{ products, alertMessage }, {  login, setAlert }] = useContext(AppContext);

  // Initialize Cloud Firestore and get a reference to the service

  createEffect(async () => {}, 0);


  const [productData, setProductData] = createSignal({
        title: { value: "Mens Cotton Jacket", errorMessage: "", tauch: false },
        category: { value: "men's clothing", errorMessage: "", tauch: false }, // id
        image: { value: null, blob: null, errorMessage: "", tauch: false },
        price: { value: "55.99", errorMessage: "", tauch: false },
        description: { value: "Mens Cotton Jacket Mens Cotton Jacket Mens Cotton Jacket Mens Cotton Jacket Mens Cotton Jacket", errorMessage: "", tauch: false },
   
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

  async function handleSaveProduct(e: SubmitEvent) {
    e.preventDefault();

    let payload: any = {}


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



    // let p = new Product({
    //     title: payload.title,
    //     price: payload.price,
    //     description: payload.description,
    //     image: "",
    //     rating: {rate: 4, count: 10},
    //     category: payload.category
    // })

    products?.forEach(async (item)=>{
        // console.log(item);

        let p = new Product({
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            rating: item.rating,
            category: item.category,
        })
        let res = await p.save()
        console.log(res);
    })

    // let res = await p.save()

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
