    import React, { useState } from 'react'
    import { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { cartAsync, removeFromCart } from './cartSlice';
import ChangeQuantityComponent from '../../components/cart/ChangeQuantity';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';

    const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartProducts = useSelector(state=> state.cart.cartProducts);
    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);

    useEffect(()=>{
   if(isJWTexpired){
    navigate('/')
   }
    }, [isJWTexpired])

    useEffect(()=>{
    dispatch(cartAsync())
    }, [])

    
 
    return (
    <div>
    <MainHeader />
    <h1 className=' font-bold text-center text-2xl'>Cart</h1>


    <div className=' md:flex md:justify-start md:items-start md:flex-wrap'>

    {
    cartProducts.map((cartProduct)=>(
    <div key={cartProduct._id} className=' mb-5 mt-3 flex flex-col items-center font-semibold border-2 border-gray-500 bg-gray-100 w-[95%] mx-auto rounded md:w-[380px] md:my-6 md:mx-3'>
    <img src={cartProduct?.thumbnail} alt="" width={250} className=' mt-2'/>
    <h1 className=' font-bold mb-1'>Brand: {cartProduct?.brand}</h1>
    <h1 className=' font-bold mb-1' >Title: {cartProduct?.title}</h1>
    <p  className=' mb-1'>Price: {cartProduct?.price}$</p>
    <p className=' mb-1'>Stock: {cartProduct?.stock}</p>
 {cartProduct?.discountPercentage > 0 && <p className=' mb-1' >Discount: {cartProduct?.discountPercentage}%</p>  }  
 {cartProduct?.discountPercentage > 0 &&  <p  className=' mb-1'>Price after discount {Number((cartProduct?.price - ((cartProduct?.price)*(cartProduct?.discountPercentage/100))).toFixed(2))}$</p> }
    <p className=' mb-1'>Quantity: {cartProduct?.quantity}</p>

  <ChangeQuantityComponent cartProduct={cartProduct} />

     <button className=' bg-red-500 text-white font-semibold px-5 py-1  rounded mb-4' onClick={()=>{
      dispatch(removeFromCart(cartProduct._id))
     }}>
      Remove from cart
     </button>

    </div>
    ))
    }

</div>


    </div>
    )
    }

    export default Cart
