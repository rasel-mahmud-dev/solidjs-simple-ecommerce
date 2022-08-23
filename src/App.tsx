import { Component, lazy } from 'solid-js';
import { useContext } from 'solid-js';
import { AppContext } from './store/index';

import { Route, Routes } from '@solidjs/router';

import Header from './components/Header';
import Alert from './components/Alert';


const AddProduct = lazy(()=>import('./pages/admin/addProduct/AddProduct'));

const Login = lazy(()=>import("./components/Login"));
const CartPage = lazy(()=>import("./pages/CartPage"));
const HomePage = lazy(()=>import("./pages/homePage/HomePage"));


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
          <Route path="/cart" component={CartPage} />
          <Route path="/admin/add-product" component={AddProduct} />
        </Routes>
    </div>
  );
};

export default App;


