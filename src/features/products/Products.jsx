import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsAsync, userAsync } from './productsSlice';
import { useNavigate } from 'react-router-dom';
import AddToCartComponent from '../../components/products/AddToCart';
import ChangeQuantityInProduct from '../../components/products/ChangeQuantityInProduct';
import LikeProductComponent from '../../components/like/LikeProductComponent';
import MainHeader from '../../components/header/MainHeader';
import MiniHeader from '../../components/header/MiniHeader';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(state=> state.products.products);
    const status = useSelector(state=> state.products.status);
    const productsInCart = useSelector(state=> state.products.productsInCart);
    const currentUser = useSelector(state=> state.products.currentUser);
    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
    
   

    useEffect(()=>{
     
     if(isJWTexpired){
      navigate('/');
     }
    }, [isJWTexpired])


    useEffect(()=>{
      dispatch(productsAsync());
      dispatch(userAsync());
     }, [])

  return (
    <div>
      <MainHeader />
      <MiniHeader />

      <h1 className=' text-center font-bold text-2xl mb-2'>Products</h1>

     {(status === "loading" && products.length === 0)? 
     
     <div className=' flex justify-center h-[50vh] items-center'>

<div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
     
     </div>
     
     
    
     : 

(products.length === 0)? <h1 className=' text-center font-semibold'>This page currently has no products. Please visit the profile page to create some.</h1>

:

      <div className=' md:flex md:justify-start md:items-start md:flex-wrap'>

      {
        products?.map((elem)=>{

          return (
            <div key={elem._id} className=' flex flex-col items-center mb-5 border-2 border-gray-400 rounded w-[95%] mx-auto bg-gray-100 md:w-[380px] md:mx-4 md:my-7'>
             <img src={elem?.thumbnail} alt="" width={250} className=' mt-2'/>
            <h1 className=' font-bold mb-1'>Brand: {elem?.brand}</h1>
            <h1 className=' font-bold mb-3'>Title: {elem?.title}</h1>
            <p className='   font-semibold  mb-3 max-w-56 overflow-hidden break-words whitespace-pre-line md:max-w-80 ' >{elem?.description && <span>Description: {elem?.description}</span> }</p>
            <p  className='  font-semibold  mb-1' >Price: {elem?.price}$</p>
        {elem?.discountPercentage > 0 &&  <p  className='  font-semibold  mb-1'>Discount: {elem?.discountPercentage}%</p> }
            <p className='   font-semibold mb-1'>Stock: {elem.stock}</p>
       {elem?.discountPercentage > 0 &&      <p  className='  font-semibold  mb-1'>Price after discount {Number((elem?.price - ((elem?.price)*(elem?.discountPercentage/100))).toFixed(2))}$</p> }

          {(productsInCart.includes(elem._id))? <ChangeQuantityInProduct elem={elem}/> : <AddToCartComponent elem={elem} /> }
           
          <LikeProductComponent elem={elem} currentUser={currentUser}/>
          </div>
          );
        }
          
        )
      }

      </div>
}


    </div>
  )
}

export default Products
