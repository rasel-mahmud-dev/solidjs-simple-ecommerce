import { Component, lazy, onMount } from "solid-js";
import { useContext } from "solid-js";
import { AppContext } from "src/store/index";
import { createEffect } from "solid-js";

import InputGroup from "src/components/inputs/InputGroup";

// import { getDocs, getFirestore, collection } from "firebase/firestore";

// const firebaseInit = import("src/firebase/init")
import { createSignal } from "solid-js";
import TextArea from "components/inputs/TextArea";
import Button from "components/Button";
const ProductModel = import("src/models/ProductModel");
import { useLocation, useParams } from "@solidjs/router";
import SelectGroup from "components/inputs/SelectGroup";
import { findCategoryBrand } from "src/utils";

const AddProduct: Component = (props) => {
  const [{ categories, brands, products, alertMessage }, {  login, setAlert }] = useContext(AppContext);

  let params = useParams()
  
  // Initialize Cloud Firestore and get a reference to the service

  const [brandsForCategory, setBrandsForCategoy] = createSignal(null)


  const [productData, setProductData] = createSignal({
    title: { value: "", errorMessage: "", tauch: false },
    categoryId: { value: "", errorMessage: "", tauch: false }, // id
    brandId: { value: "", errorMessage: "", tauch: false }, // id
    image: { value: null, blob: null, errorMessage: "", tauch: false },
    price: { value: "", errorMessage: "", tauch: false },
    description: { value: "", errorMessage: "", tauch: false },
  })

  

  createEffect(async()=>{
    if(params.id){
      const {default: Product}= await ProductModel
      let product = await Product.findOne(params.id)

      let updateProductData = {...productData()}
      for (const key in updateProductData) {
      
        if(product[key]){
          updateProductData[key] = {
            ... updateProductData[key],
            value: product[key],
            errorMessage: ""
          }
        }
      }  
      setProductData(updateProductData)          
    }
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



    if(name === "categoryId"){
      let b = findCategoryBrand(brands, value)
      if(b && b.length >0){
        setBrandsForCategoy(b)
      } else{
        setBrandsForCategoy(null)
      }
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
        if (!productDataPayload[key].value) {
            updatedState[key].errorMessage = `${key} is required`
            isCompleted = false;
            
        } else {
            payload[key] = productDataPayload[key].value
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

        let p = new ProductModel({
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            rating: item.rating,
            categoryId: item.categoryId,
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
        {/*********** Title **************/}
        <InputGroup
          name="image"
          type="text"
          label="Image"
          placeholder="Enter Image Link"
          onInput={handleChange}
          reactiveState={productData}
        />

        <img class="w-full" src={productData().image.value} alt="image" srcset="" />
        {/*********** Price **************/}
         <InputGroup
          name="price"
          type="number"
          step="any"
          label="Price"
          placeholder="Enter Product price"
          onInput={handleChange}
          reactiveState={productData}
        />

        {/*********** Category **************/}
        <SelectGroup
          name="categoryId"
          label="Select Category"
          onInput={handleChange}
          reactiveState={productData}
          options={()=>(
            <>
              <option value="">select a category</option>
              { categories && categories.map(item=> item.parent_id && (
                <option value={item._id}>{item.name}</option>
              )) }
            </>
          )}
        />
    
        {/*********** Brands **************/}
        <SelectGroup
          name="brandId"
          label="Select Brand"
          onInput={handleChange}
          reactiveState={productData}
          options={()=>(
            <>
              <option value="">select a brand</option>
              { (!brandsForCategory() && brands) 
              ? brands.map(item=> (
                  <option value={item._id}>{item.name}</option>
              ))
              : brandsForCategory() && brandsForCategory().map(item=> (
                <option value={item._id}>{item.name}</option>
              )
            )}
            </>
          )}
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
