import { Component, lazy, onMount } from "solid-js";
import { useContext } from "solid-js";
import { AppContext } from "src/store/index";
import { createEffect } from "solid-js";

import InputGroup from "src/components/inputs/InputGroup";


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


    const {default: Product}= await ProductModel

    let data = {
      title: payload.title,
      price: payload.price,
      description: payload.description,
      image: payload.image,
      rating: {rate: 4, count: 10},
      categoryId: payload.categoryId,
      brandId: payload.brandId
  }

    if(params.id){
      // update product 
      let response = await Product.updateOne(data, params.id)
      if(response){        
        setAlert({isOpen: true, message: "Product has been updated", status: 200}) 
      } else{
        setAlert({isOpen: true, message: "Product update fail", status: 500}) 
      }
      return;
    }
 
    let p = new Product(data)

    let res = await p.save()
    if(res){        
      setAlert({isOpen: true, message: "Product has been Added", status: 200}) 
    } else{
      setAlert({isOpen: true, message: "Product Adding fail", status: 500}) 
    }
  }

  return (
    <div class="">

      <h1 class="text-xl font-bold text-center">{params.id ? "Update Product" : "Add Product"}</h1>


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

        <div class="w-40 mx-auto my-4">
          <img class="object-cover w-full h-full" src={productData().image.value} alt="image" srcset="" />
        </div>

        
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
      

       
        <Button type="submit">{params.id ? "Update Product" : "Add Product"} </Button>
      </form>
    </div> 
    
  );
};

export default AddProduct;
