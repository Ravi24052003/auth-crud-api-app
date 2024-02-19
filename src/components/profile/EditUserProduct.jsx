import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProduct } from '../../features/profile/profileSlice';

const EditUserProduct = ({product}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const status = useSelector(state=> state.profile.status);
    const productEditKey = useSelector(state=> state.profile.productEditKey);

  return (
    <>
    <form onSubmit={handleSubmit((formValue)=>{
   const {thumbnail, brand, title, description, price, discountPercentage, stock, category} = formValue;

   if(!thumbnail){
    delete formValue.thumbnail
   }

   if(!brand){
    delete formValue.brand
   }

   if(!title){
    delete formValue.title
   }

   if(!description){
    delete formValue.description
   }

   if(!price){
    delete formValue.price
   }

   if(!discountPercentage){
    delete formValue.discountPercentage
   }

   if(!stock){
    delete formValue.stock
   }

   if(!category){
    delete formValue.category
   }


   dispatch(updateUserProduct({formValue, id: product._id}))
   
    })}>





        <div className=' flex flex-col items-center mt-3'>

   
    <div className=' flex flex-col mb-3'>
    <input type="text"
    className = ' border border-black w-[220px] rounded focus:bg-indigo-100 '
    placeholder='Thumbnail'
    {...register("thumbnail")}
    />
     <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.thumbnailError}</p>
     </div>


   <div  className=' flex flex-col mb-3'>
    <input type="text"
    className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Brand'
    {...register("brand")}
    />
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.brandError}</p>
    </div>

   <div className=' flex flex-col mb-3'>
   <input type="text"
    className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Title'
    {...register("title")}
    />
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{productEditKey === product._id && (status?.code === 11000) && <span>This title already exists</span> }</p>
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.titleError}</p>
   </div>
   

<div className=' flex flex-col mb-3' >
<input type="text"
    className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Description'
    {...register("description")}
    />
     <p className=' text-red-500 w-[220px] text-sm font-semibold' >{status?.productId === product._id && status?.descriptionError}</p>
</div>
   

<div className=' flex flex-col mb-3' >
<input type="text"
className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Price'
    {...register("price")}
    />
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.priceError}</p>
     <p className=' text-red-500 w-[220px] text-sm font-semibold' >{status?.productId === product._id && (status?.kind === 'Number' && status?.path === 'price') && <span>Price should be a valid number</span> }</p>
</div>


<div className=' flex flex-col mb-3' >
<input type="text"
className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Discount'
    {...register("discountPercentage")}
    />
<p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.discountError}</p>
<p className=' text-red-500 w-[220px] text-sm font-semibold' >{status?.productId === product._id && (status?.kind === 'Number' && status?.path === 'discountPercentage') && <span>Discount should be a valid number</span> }</p>
</div>

<div className=' flex flex-col mb-3'>
<input type="text"
className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Stock'
    {...register("stock")}
    />
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.stockError}</p>
    <p className=' text-red-500 w-[220px] text-sm font-semibold' >{status?.productId === product._id && (status?.kind === 'Number' && status?.path === 'stock') && <span>Stock should be a valid number</span> }</p>
</div>

<div className=' flex flex-col mb-3'>
<input type="text"
className = ' border border-black w-[220px] rounded focus:bg-indigo-100 ' 
    placeholder='Category'
    {...register("category")}
    />
    <p className=' text-red-500 w-[220px] text-sm font-semibold'>{status?.productId === product._id && status?.categoryError}</p>
</div>


<button className=' bg-yellow-500 text-white font-bold px-4 py-1 rounded'>Done</button>


</div>




    </form>
    </>
  )
}

export default EditUserProduct
