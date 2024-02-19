import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {createProduct as createProductAsync, setIsProductCreated} from "../../features/profile/profileSlice";
import MainHeader from '../header/MainHeader';

const CreateProduct = () => {
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProductCreated = useSelector(state=> state.profile.isProductCreated);
  const status = useSelector(state=> state.profile.status);
  const isJWTexpired = useSelector(state=> state.login.isJWTexpired);

    useEffect(()=>{
   if(isJWTexpired){
    navigate('/')
   }
    }, [isJWTexpired])
  

  useEffect(()=>{
    if(isProductCreated){
      dispatch(setIsProductCreated());
      navigate("/profile");
    }
  }, [isProductCreated])

    return (


      <div>
      <MainHeader />


<form className=" flex flex-col items-center" onSubmit={handleSubmit((formValue)=>{
        dispatch(createProductAsync(formValue))
      })}>
        
         
          <legend className=' font-bold text-center text-3xl mb-4'>Create Product</legend>

          <div>
            <label className="col-md-4 control-label font-semibold" htmlFor="brand">
              Brand
            </label>
            <div className="col-md-4 mb-4">

<input type="text" id='brand' 
              
              className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
           {...register("brand")}
              />
              <div className=' flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.brand?.message }</p>
        </div>
            </div>
          </div>
        
          <div className="form-group">
            <label className=" text-center font-semibold" htmlFor="title">
              Title
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="title"
                type="text"
  
                className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
               {...register("title")}
              />
              <div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{(status?.code === 11000)? "This title already exists" : null }</p>
        </div>
        <div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.title?.message }</p>
        </div>

            </div>
          </div>


          <div className="form-group">
            <label className=" text-center font-semibold" htmlFor="description">
              Description
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="description"
                type="text"
               
                className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
               {...register("description")}
              />

            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label font-semibold" htmlFor="price">
              Price
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="price"
                type="number"
              
                className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
                {...register("price")}
              />

<div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.price?.message }</p>
        </div>
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label font-semibold" htmlFor="discountPercentage">
              Discount
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="discountPercentage"
                type="number"
              
                className="form-control input-md bg-gray-100 max-[600px]:w-[250px] border border-gray-500 rounded"
                {...register("discountPercentage")}
              />

<div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.discountPercentage?.message }</p>
        </div>
              
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label font-semibold" htmlFor="stock">
              Stock
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="stock"
                type="number"
              
                className="form-control input-md bg-gray-100 max-[600px]:w-[250px] border border-gray-500 rounded"
                {...register("stock")}
              />

<div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.stock?.message }</p>
        </div>
              
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label font-semibold" htmlFor="thumbnail">
              Thumbnail
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="thumbnail"
                type="text"
               
                className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
               {...register("thumbnail")}
              />

<div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.thumbnail?.message }</p>
        </div>
            </div>
          </div>

       
          
          <div>
            <label className="col-md-4 control-label font-semibold" htmlFor="category">
              Category
            </label>
            <div className="col-md-4 mb-4">

              <input type="text" id='category'
              
              className=" border border-gray-500 rounded w-[300px] bg-gray-100 max-[600px]:w-[250px]"
             {...register("category")}
              />

<div className=' w-[100%] flex justify-start'>
        <p className=' max-w-64 text-red-500 font-semibold text-sm'>{status?.errors?.category?.message }</p>
        </div>
            </div>
          </div>
          


          <div className="form-group">
            <div className=" flex justify-center">
              <button
                id="singlebutton"
                name="singlebutton"
                className="bg-green-400  px-4 text-white py-1 font-bold rounded mb-4"
                >
               Create Product
              </button>
            </div>
          </div>
        
      </form>
      </div>

     
    );
  };
  
  export default CreateProduct;
