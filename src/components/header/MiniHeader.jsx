import React, { useEffect, useState } from 'react'
import CartLogo from "../../assets/cart.svg"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MiniHeader = () => {
    const productsInCart = useSelector(state=> state.cart.cartProducts);

  return (
    <div>
      <ul className=' flex justify-end mr-4 mb-2'>
        <li className='flex-col items-center justify-center'>
           <p className=' font-bold  text-center'>{productsInCart.length}</p>
            <NavLink to= '/cart'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-gray-700"
             } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
           }
            >
           <img src={CartLogo} alt="cart" />
            </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default MiniHeader
