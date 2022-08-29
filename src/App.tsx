import {Component, createEffect, lazy, onMount} from 'solid-js';
import { useContext } from 'solid-js';
import { AppContext } from 'store/index';

import {Navigate, Route, Routes, useNavigate} from '@solidjs/router';

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
import Checkout from "pages/Checkout";



const App: Component = () => {

  const [{alertMessage, auth, authFetched}, {login, fetchCart, setAuthFetched, setAlert} ]= useContext(AppContext)

  const navigate = useNavigate();

  onMount(async()=>{

    let localStorageCartItems = localStorage.getItem("cart")
    if(localStorageCartItems) {
      try {
        let cartObject = JSON.parse(localStorageCartItems)
        cartObject && fetchCart(cartObject)
      } catch (ex) {}
    }
  })

  createEffect(()=>{
    let auth2 = getAuth()
    auth2.onAuthStateChanged(user => {

      if(user && user.emailVerified){
        login({
            username: user.displayName,
            avatar: user.photoURL,
            userId: user.uid,
            email: user.email, 
        })

        setAuthFetched({isFetch: true, loadUrl: ""})

      } else {

        setAuthFetched({isFetch: true, loadUrl: location.pathname})
        if (user) {
          setAlert({isOpen: true, message: "Please use verified email"})
          auth.signOut().then(() => {
            login(null)
          }).catch(ex => {
            console.log(ex)
          })
        }
      }
    })


  })


    return (
    <div>
      <Header />

      {alertMessage.isOpen && <Alert message={alertMessage.message} status={alertMessage.status} /> }
      <Routes>

        {/**** login registration route register before logged user */}
        {(!auth) ? (
            <>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/registration" component={Registration} />
            </>
        ) : (
          <Route
            path="*"
            element={<Navigate href="/" />}
            />
        )}

        <Route path="/" component={HomePage} />
        <Route path="/details/:id" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={Checkout} />

        {/**** admin route register after user logged */}
        {(!authFetched.isFetch || auth) ? (
            <Route path="/admin" component={Dashboard}>
              <Route path="/" component={DashboardHome} />
              <Route path="/update-product/:id" component={AddProduct} />
              <Route path="/add-product" component={AddProduct} />
            </Route>
        ) : (
            <Route
                path="*"
                element={<Navigate href="/auth/login"
                    // state={{successRedirectUrl: authFetched.loadUrl}}
                />}
            />
        ) }
      </Routes>        

    </div>
  );
};
export default App;


