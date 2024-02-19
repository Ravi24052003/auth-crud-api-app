import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProduct, getUserProducts, setProductEditKey } from '../../features/profile/profileSlice';
import EditUserProduct from './EditUserProduct';

const userProductsList = () => {
 const dispatch = useDispatch();
 const userProducts = useSelector(state=> state.profile.userProducts);
 const productEditKey = useSelector(state=> state.profile.productEditKey);
 const status = useSelector(state=> state.profile.status);

 useEffect(()=>{
  dispatch(getUserProducts())
 }, [])

  return (
   <>

  {(userProducts.length === 0 && status === "idle") && <h1 className=' font-semibold text-center'> You have not created any product yet please click create product button above to create product </h1> }


<div className=' md:flex md:justify-start md:items-start md:flex-wrap'>


   {
userProducts?.map((product)=> (
  <div key={product._id} className=' border-2 border-gray-400 bg-gray-50 rounded w-[95%] my-6 mx-auto md:w-[380px] md:my-6 md:mx-3'>
{(productEditKey === product._id)?  <EditUserProduct product={product} />  

:
<div className=' font-semibold flex flex-col items-center mt-3'>
<img src={product?.thumbnail} alt="" width={250} />
<h1>Brand: {product?.brand}</h1>
<h2>Title: {product?.title}</h2>
<p className=' max-w-56 overflow-hidden my-2 break-words whitespace-pre-line md:max-w-72'>{product?.description && <span>Description: {product?.description}</span> }</p>
<p>Price: {product?.price}</p>
<p> {product?.discountPercentage && <span>Discount: {product?.discountPercentage}</span> }</p>
<p>Stock: {product?.stock}</p>
<p>Category: {product?.category}</p>

<button className=' bg-yellow-500 text-white font-bold px-4 py-1 rounded' onClick={()=>{
 dispatch(setProductEditKey(product._id))
}}>Edit</button>
</div>
}
  
<div className=' flex justify-center my-3'>
<button className=' bg-red-500 text-white font-bold px-4 py-1 rounded' onClick={()=>{
  dispatch(deleteUserProduct(product._id))
}}>Delete Product</button> 
</div>

  </div>
))
   }

</div>


   </>
  )
}

export default userProductsList
