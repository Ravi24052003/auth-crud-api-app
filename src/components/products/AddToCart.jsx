import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/products/productsSlice';
import { setStatusIdle } from '../../features/products/productsSlice';

const AddToCart = ({elem}) => {
    const dispatch = useDispatch();
    const status = useSelector(state=> state.products.status);
    const [changeQuantity, setChangeQuantity] = useState(1);
    const [key, setKey] = useState(null);

  return (
    <>
    <div className=' flex flex-col items-center font-semibold'>

<div>
    <button className=' text-4xl font-semibold'  onClick={()=>{
    if(elem._id !== key){
    dispatch(setStatusIdle())
    setChangeQuantity(1);
    }
    setKey(elem._id);
    if(changeQuantity > 1){
    setChangeQuantity((previousVal)=> previousVal - 1);
    }
    }}>-</button>

    <span className=' text-lg font-semibold border-gray-500 border rounded px-3'>{(elem._id === key)? changeQuantity : 1}</span> 

    <button  className=' text-3xl font-semibold' onClick={()=>{
    if(elem._id !== key){
    dispatch(setStatusIdle())
    setChangeQuantity(1);
    }
    setKey(elem._id)
    if(changeQuantity < 10){
    setChangeQuantity((previousVal)=> previousVal +1);
    }
    }}>+</button>
</div>



              <button className=' bg-blue-400 px-3 py-1 text-white rounded font-semibold' onClick={()=>{
                dispatch(setStatusIdle())
                dispatch(addToCart({id: elem._id, quantity: (elem._id === key)? changeQuantity : 1 }))
              }}>Add to Cart</button>

              <p className=' text-center mb-2 text-red-500'>{ (status?.productId === elem._id) && status?.error?.quantityError}</p>
            </div>
    </>
         
    
  )
}

export default AddToCart
