import React from 'react'
import { useDispatch } from 'react-redux'
import { likeAsync } from '../../features/products/productsSlice';



const LikeProductComponent = ({elem, currentUser}) => {
    const dispatch = useDispatch();

  return (
    <>

   <div className=' flex justify-center font-semibold text-2xl'>
   <span>{elem.likes.length}</span>

{elem.likes.includes(currentUser._id)?
    <i className="fa-solid fa-thumbs-up cursor-pointer mx-1" onClick={()=>{
        dispatch(likeAsync(elem._id))
    }}></i>
    :
    <i className="fa-regular fa-thumbs-up cursor-pointer mx-1" onClick={()=>{
        dispatch(likeAsync(elem._id))
    }}></i>
  
  }
   </div>


    </>
  )
}

export default LikeProductComponent
