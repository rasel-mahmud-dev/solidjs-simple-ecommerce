import { Component, lazy } from 'solid-js';

const HomePage = lazy(()=>import("./pages/HomePage"));
import Header from './components/Header';
import { Route, Routes } from '@solidjs/router';
import Alert from './components/Alert';
const Login = lazy(()=>import("./components/Login"));
const CartPage = lazy(()=>import("./pages/CartPage"));
import { useContext } from 'solid-js';
import { AppContext } from './store/index';


const App: Component = () => {

  const [{alertMessage} ]= useContext(AppContext)

  console.log(alertMessage.message);
  

  return (
    <div>
      <Header />

      {alertMessage.isOpen && <Alert message={alertMessage.message} status={alertMessage.status} /> }

        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
        </Routes>
    </div>
  );
};

export default App;


