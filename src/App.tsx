import { Component, lazy } from 'solid-js';

const HomePage = lazy(()=>import("./pages/HomePage"));
import Header from './components/Header';
import { Route, Routes } from '@solidjs/router';
const Login = lazy(()=>import("./components/Login"));
const CartPage = lazy(()=>import("./pages/CartPage"));



const App: Component = () => {
  return (
    <div>
      <Header />

        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
        </Routes>
    </div>
  );
};

export default App;


