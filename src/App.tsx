import { Component, lazy } from 'solid-js';
import { useContext } from 'solid-js';
import { AppContext } from './store/index';
import { createEffect } from 'solid-js';

import { Route, Routes } from '@solidjs/router';

import Header from './components/Header';
import Alert from './components/Alert';
import { Product } from './models/Product';
import Button from './components/Button';
import AddProduct from './pages/admin/addProduct/AddProduct';

const Login = lazy(()=>import("./components/Login"));
const CartPage = lazy(()=>import("./pages/CartPage"));
const HomePage = lazy(()=>import("./pages/HomePage"));

// import { getDocs, getFirestore, collection } from "firebase/firestore";


const firebaseInit = import("./firebase/init")

const App: Component = () => {

  const [{alertMessage}, {login} ]= useContext(AppContext)

  

// Initialize Cloud Firestore and get a reference to the service


  createEffect(async()=>{

    const {default: db} = await firebaseInit
  

    // try {
    //   const querySnapshot  = await getDocs(collection(db, "products"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, doc.data());
    //   });
      

    // } catch (e) {
    //   console.error(e);
    // }

    let auth = localStorage.getItem("auth")
    login(JSON.parse(auth))
  }, 0)

  async function addProduct(){

    let products = await Product.findAll()
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


  return (
    <div>
      <Header />

      {alertMessage.isOpen && <Alert message={alertMessage.message} status={alertMessage.status} /> }

        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
        </Routes>

        <AddProduct />

  

    </div>
  );
};

export default App;


