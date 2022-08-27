import { Component, lazy } from 'solid-js';
import { useContext } from 'solid-js';
import { AppContext } from 'src/store/index';

import { Route, Routes } from '@solidjs/router';

import Header from './components/Header';
import Alert from './components/Alert';

const AddProduct = lazy(()=>import('./pages/admin/dashboard/addProduct/AddProduct'));

const Login = lazy(()=>import("pages/auth/Login"));
const Registration = lazy(()=>import("pages/auth/Registration"));
const CartPage = lazy(()=>import("./pages/CartPage"));
const HomePage = lazy(()=>import("./pages/homePage/HomePage"));
const ProductDetail = lazy(()=>import("pages/productDetail/ProductDetail"));
const Dashboard = lazy(()=>import("./pages/admin/dashboard/Dashboard"));

const DashboardHome = lazy(()=>import("./pages/admin/dashboard/DashboardHome"));


// initialized firebase app
import  "src/firebase/init"

import { getAuth } from "firebase/auth";

import { onMount } from 'solid-js';


import { createEffect } from 'solid-js';

const App: Component = () => {

  const [{alertMessage}, {login} ]= useContext(AppContext)

  onMount(async()=>{
    // let auth = localStorage.getItem("auth")
    // login(JSON.parse(auth))
  })

  createEffect(()=>{
    let auth = getAuth()
    auth.onAuthStateChanged(user => {
      if(user){
        login({
            username: user.displayName,
            avatar: user.photoURL,
            userId: user.uid,
            email: user.email, 
        })
      }
    })
  })

    return (
    <div>
      <Header />

      {alertMessage.isOpen && <Alert message={alertMessage.message} status={alertMessage.status} /> }
      <Routes>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/registration" component={Registration} />
        <Route path="/" component={HomePage} />
        <Route path="/details/:id" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        
        
        {/* <Route path="/admin" component={Dashboard} />
        <Route path="/admin/add-product" component={AddProduct} />
        <Route path="/admin/update-product/:id" component={AddProduct} /> */}

        <Route path="/admin" component={Dashboard}>
          <Route path="/" component={DashboardHome} />
          <Route path="/update-product/:id" component={AddProduct} />
          <Route path="/add-product" component={AddProduct} />
        </Route>
      </Routes>        

    </div>
  );
};

export default App;


