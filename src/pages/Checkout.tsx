import { Component, createSignal, createEffect,For, useContext } from "solid-js"
import { AppContext } from './../store/index';
import {findCategoryBrand} from "../utils";
import InputGroup from "components/inputs/InputGroup";
import SelectGroup from "components/inputs/SelectGroup";
import TextArea from "components/inputs/TextArea";
import Button from "components/Button";


const Checkout:Component = ()=> {

    const [{cart}, {setCart}] = useContext(AppContext)


    const [productData, setProductData] = createSignal({
        name: { value: "", errorMessage: "" },
        phone: { value: "", errorMessage: "" }, // id
        email: { value: "", errorMessage: "" }, // id
        zipCode: { value: null, blob: null, errorMessage: "" },
        Division: { value: "", errorMessage: "" },
        thana: { value: "", errorMessage: "" },
        city: { value: "", errorMessage: "" },
        address: { value: "", errorMessage: "" },
        coupon: { value: "", errorMessage: "" },
    })

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


    function calcTotalPrice(cart){
        let totalPrice = 1
        let totalItems =  0

        if(!cart){
            return 0;
        }

        for(let key in cart){
            totalPrice = (cart[key].quantity * cart[key].price);
            totalItems +=  cart[key].quantity
        }

        return {price: totalPrice * Object.keys(cart).length, items: totalItems}
    }


    return (
        <div class="max-w-screen-lg mx-auto px-4">
            <h1 class="text-3xl text-center font-semibold mt-4">Checkout</h1>
            <div class="grid grid-cols-12 mt-20 gap-x-8">
                <div class="col-span-8">
                    <h1 class="text-neutral-800 font-medium">Add Shipping Address</h1>
                    <form onSubmit={handleSaveProduct}>
                        {/*********** Title **************/}
                        <InputGroup
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="your name"
                            className="items-center"
                            onInput={handleChange}
                            reactiveState={productData}
                        />

                        <InputGroup
                            name="phone"
                            type="text"
                            label="Phone"
                            placeholder="your phone"
                            className="items-center"
                            onInput={handleChange}
                            reactiveState={productData}
                        />
                        <InputGroup
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="your email"
                            className="items-center"
                            onInput={handleChange}
                            reactiveState={productData}
                        />


                        {/*********** Category **************/}
                        {/*<SelectGroup*/}
                        {/*    name="categoryId"*/}
                        {/*    label="Select Category"*/}
                        {/*    onInput={handleChange}*/}
                        {/*    reactiveState={productData}*/}
                        {/*    options={() => (*/}
                        {/*        <>*/}
                        {/*            <option value="">select a category</option>*/}
                        {/*            {categories && categories.map(item => item.parent_id && (*/}
                        {/*                <option value={item._id}>{item.name}</option>*/}
                        {/*            ))}*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*/>*/}

                        <InputGroup
                            name="address"
                            type="text"
                            label="Address"
                            placeholder="your address"
                            className="items-center"
                            onInput={handleChange}
                            reactiveState={productData}
                        />

                        <InputGroup
                            name="zipCode"
                            type="number"
                            label="Zip Code"
                            placeholder="zip code"
                            className="items-center"
                            onInput={handleChange}
                            reactiveState={productData}
                        />


                        <Button type="submit" class="btn-disable">Add Address</Button>
                    </form>

                    <div class="mt-10">

                        <InputGroup
                            name="coupon"
                            type="text"
                            class="items-center"
                            label="Add coupon to get upto 60% off"
                            className="!mt-1 items-center"
                            labelClass="!max-w-[250px] !w-full"
                            placeholder="Coupon code"
                            onInput={handleChange}
                            reactiveState={productData}
                        />
                        <Button type="button" class="btn-disable">Apply Coupon</Button>
                    </div>

                </div>
                <div class="col-span-4">
                    <h1 class="font-medium flex justify-between "><span>Items Price:</span> {calcTotalPrice(cart).price}</h1>
                    <h1 class="font-medium flex justify-between"><span>Total:</span> {calcTotalPrice(cart).items}</h1>
                    <div class="flex justify-between">
                        <span>Discount</span>
                        <span>10%</span>
                    </div>

                    <Button class="block ml-auto btn-disable" type="button">Go to payment</Button>

                </div>
            </div>
        </div>
    )
}

export default Checkout