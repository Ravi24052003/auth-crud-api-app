import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartAsync, changeQuantityAsync } from '../../features/cart/cartSlice'
import { setStatusIdle } from '../../features/products/productsSlice'

const ChangeQuantityInProduct = ({elem}) => {
const dispatch = useDispatch();

const cartProducts = useSelector(state=> state.cart.cartProducts);
const status = useSelector(state=> state.cart.status);
const [key, setKey] = useState(null);

useEffect(()=>{
dispatch(cartAsync())
}, [])

return (
<div>
{
cartProducts.map((cartProduct)=>{

    if(cartProduct._id === elem._id){
        return (
            <div key={cartProduct._id} className=' mb-5 mt-2 flex flex-col items-center'>


                <div>
                <button className='text-3xl font-semibold' onClick={()=>{
                setKey(null)
            if(cartProduct?.quantity > 1){
                dispatch(setStatusIdle())
            setKey(elem._id)
            dispatch(changeQuantityAsync({id: cartProduct._id, quantity: (Number(cartProduct?.quantity) -1) }));
            }
            }}>-</button>
            
            <span className=' text-lg font-semibold border-gray-500 border rounded px-3'>{cartProduct?.quantity}</span> 
            
            <button className='text-3xl font-semibold' onClick={()=>{
                setKey(null)
            if(cartProduct?.quantity < 10){
                dispatch(setStatusIdle())
                setKey(elem._id)
            dispatch(changeQuantityAsync({id: cartProduct._id, quantity: (Number(cartProduct?.quantity) + 1)}))
            }
            }}>+</button>
            
                </div>
            
           
            <p className=' font-semibold text-center  text-red-500' >{ (status?.productId === elem._id) && status?.error?.quantityError}</p>
            </div>
                )
    }

}

)
}
</div>
)
}

export default ChangeQuantityInProduct
