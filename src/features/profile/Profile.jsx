import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentUser, getCurrentUser, setUserEditable } from './profileSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserProductList from '../../components/profile/UserProductList'
import MainHeader from '../../components/header/MainHeader';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state=> state.profile.currentUser);
  const userEditable = useSelector(state=> state.profile.userEditable);
  const status = useSelector(state=> state.profile.status);
  const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
  const userProducts = useSelector(state=> state.profile.userProducts);
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate()

  useEffect(()=>{
   if(isJWTexpired){
    navigate("/")
   }
  }, [isJWTexpired])

  useEffect(()=>{
  dispatch(getCurrentUser())
  }, [])
  
  return (
 <>
<MainHeader />
<h1 className=' text-center font-bold text-3xl'>Profile</h1>

{(status === "loading" && userProducts.length === 0  && !currentUser?.email)?   <div className=' flex justify-center h-[50vh] items-center'>

<div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
     
     </div>
     
    :
    
 
userEditable? 
 <div>
  <form onSubmit={handleSubmit((formVal)=>{
    const {firstName, lastName, password} = formVal;
    if(!firstName){
      delete formVal.firstName
    }
    if(!lastName){
      delete formVal.lastName
    }
    if(!password){
      delete formVal.password
    }
   
  dispatch(editCurrentUser(formVal))
  })}>


    <div className=' flex flex-col items-center mt-2 mb-6'>

    <div className=' mb-2'>
    <input type="text"
    placeholder='First Name'
    className=' border border-black w-[220px] rounded focus:bg-indigo-100 '
    {...register("firstName")}
    />
    <p className=' w-[220px] text-red-500 font-semibold text-sm'>{status?.error?.firstNameError}</p>
    </div>
   

<div className=' mb-2'>
<input type="text"
    placeholder='Last Name'
    className=' border border-black w-[220px] rounded focus:bg-indigo-100 '
    {...register("lastName")}
    />
     <p className=' w-[220px] text-red-500 font-semibold text-sm'>{status?.error?.lastNameError}</p>
</div>
    

    <div className=' mb-2'>
    <input type="text"
    placeholder='Password'
    className=' border border-black w-[220px] rounded focus:bg-indigo-100 '
    {...register("password")}
    />
   <p className=' w-[220px] text-red-500 font-semibold text-sm'>{status?.error?.passwordError}</p>
    </div>

    

  <button className=' bg-yellow-500 px-4 py-1 text-white rounded'>Done</button>

  </div>


  </form>
 </div>  
 
 :   

 <div className=' flex flex-col items-center font-semibold mt-2 mb-6'>
  <h2>{currentUser?.email}</h2>
  <h1>First name: {currentUser?.firstName}</h1>
   <h1>{(currentUser?.lastName) && <span>Last name: {currentUser?.lastName}</span> }</h1>
   <button className=' bg-yellow-500 px-4 py-1 text-white rounded mt-3' onClick={()=>{
    dispatch(setUserEditable())
   }}>Edit</button>
 </div>

}

{(status === "loading" && userProducts.length === 0  && !currentUser?.email)? null : 

<div>
<div className=' flex justify-center'>
<button className=' bg-green-500 font-bold px-4 py-1 rounded text-white' onClick={()=>{
  navigate('/createProduct')
}}>Create Product</button>
</div>


<UserProductList />
</div>

}


 </>
  )
}

export default Profile
