import { Component, lazy } from 'solid-js';
import { useContext } from 'solid-js';
import { AppContext } from './store/index';

import { Route, Routes } from '@solidjs/router';

import Header from './components/Header';
import Alert from './components/Alert';


const AddProduct = lazy(()=>import('./pages/admin/dashboard/addProduct/AddProduct'));

const Login = lazy(()=>import("./components/Login"));
const CartPage = lazy(()=>import("./pages/CartPage"));
const HomePage = lazy(()=>import("./pages/homePage/HomePage"));
const ProductDetail = lazy(()=>import("pages/productDetail/ProductDetail"));
const Dashboard = lazy(()=>import("./pages/admin/dashboard/Dashboard"));
const DashboardHome = lazy(()=>import("./pages/admin/dashboard/DashboardHome"));


import { onMount } from 'solid-js';


const App: Component = () => {

  const [{alertMessage}, {login} ]= useContext(AppContext)


  // Initialize Cloud Firestore and get a reference to the service


  onMount(async()=>{
    let auth = localStorage.getItem("auth")
    login(JSON.parse(auth))
  })


  return (
    <div>
      <Header />

      {alertMessage.isOpen && <Alert message={alertMessage.message} status={alertMessage.status} /> }
      <Routes>
        <Route path="/login" component={Login} />
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


