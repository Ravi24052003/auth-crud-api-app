import React, { useState } from 'react'
import { changeQuantityAsync } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChangeQuantity = ({cartProduct}) => {
    const dispatch = useDispatch();
    const status = useSelector(state=> state.cart.status);
    const [key, setKey] = useState(null);


  return (
    <>
         <div className=' my-5 font-semibold flex flex-col items-center'>

    <div>
    <button className='text-3xl' onClick={()=>{
    if(cartProduct?.quantity > 1){
      setKey(cartProduct._id)
    dispatch(changeQuantityAsync({id: cartProduct._id, quantity: (Number(cartProduct?.quantity) -1) }));
    }
    }}>-</button>

    <span className=' text-lg border border-gray-500 rounded px-3'>{cartProduct?.quantity}</span> 

    <button className='text-3xl' onClick={()=>{
    if(cartProduct?.quantity < 10){
      setKey(cartProduct._id)
    dispatch(changeQuantityAsync({id: cartProduct._id, quantity: (Number(cartProduct?.quantity) + 1)}))
    }
    }}>+</button>
    </div>



<p className=' text-center text-red-500'>{(status?.productId === cartProduct._id) && status?.error?.quantityError}</p>
    </div>

    </>
  )
}

export default ChangeQuantity
