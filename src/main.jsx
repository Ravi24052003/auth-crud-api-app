import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route ,RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Login from './features/login/Login.jsx'
import Signup from './features/signup/Signup.jsx'
import ErrorPage from './ErrorPage.jsx'
import Products from './features/products/Products.jsx'
import Cart from './features/cart/Cart.jsx'
import Profile from './features/profile/Profile.jsx'
import CreateProduct from './components/profile/CreateProduct.jsx'
import Users from './features/users/Users.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
   <Route path='/' element={<App />} errorElement={<ErrorPage />}>
   <Route path='' element={<Login />}/>
   <Route path='signup' element={<Signup />} />
   <Route path='products' element={<Products />} />
   <Route path='cart' element={<Cart />} />
   <Route path='profile' element={<Profile />} />
   <Route path='createProduct' element={<CreateProduct />} />
   <Route path='users' element={<Users />} />
   </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
 
  </React.StrictMode>,
)
