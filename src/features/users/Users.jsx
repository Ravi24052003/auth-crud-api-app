import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllUsers} from "./usersSlice"
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state=> state.users.users);
    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);


    useEffect(()=>{
     if(isJWTexpired){
      navigate('/');
     }
    }, [isJWTexpired])

    useEffect(()=>{
    dispatch(getAllUsers())
    }, [])
  return (
    <>
    <MainHeader />
    <h1 className=' text-center font-bold text-2xl'>Users</h1>

    {users.length === 0 && <div className=' flex justify-center h-[50vh] items-center'>

<div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
     
     </div>}

    <div className=' md:flex md:justify-start md:items-start md:flex-wrap'>

    
    {users.map((user, i)=>(
        <div key={user._id} className=' font-semibold ml-5 mb-5 md:w-[280px] md:my-7'>
          <div>
          <h1><span className=' font-bold'>{i+1})  First Name:</span>  {user?.firstName}</h1>
         <h2>{user?.lastName && <span> <span className=' font-bold'>Last Name:</span> {user?.lastName}</span> }</h2>
         <h2><span className=' font-bold'>Email:</span>  {user?.email}</h2>
          </div>
        
        </div>
    ))}

</div>
    </>
  )
}

export default Users
