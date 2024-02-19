import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../../conf/conf";

const initialState = {
    status: 'idle',
    currentUser: {},
    userEditable: false,
    isProductCreated: false,
    userProducts: [],
    productEditKey: null
}

export const getCurrentUser = createAsyncThunk(
    'profile/fetchUser',
    async (value = null, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/users/user`,{
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            } );
          
            const user = response.data;
            return user;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const editCurrentUser = createAsyncThunk(
    'profile/editUser',
    async (formVal, options)=>{
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.patch(`${conf.backendBaseUrl}/users/user`,formVal ,{
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            } );

            const editedUser = response.data;

            return editedUser;
        } catch (error) {
            throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const createProduct = createAsyncThunk(
    'profile/createProduct',
    async (formVal, options)=>{
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.post(`${conf.backendBaseUrl}/products`, formVal, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            })

            const product = response.data;

          

            return product
        } catch (error) {
           
            throw options.rejectWithValue(error?.response?.data)
        }
    

    }
)


export const getUserProducts = createAsyncThunk(
    'profile/getProducts',
    async (formVal=null, options)=>{
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/products/userProducts`, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            })

            const products = response.data;

          

            return products;
        } catch (error) {
          
            throw options.rejectWithValue(error?.response?.data)
        }
    

    }
)


export const updateUserProduct = createAsyncThunk(
    'profile/updateUserProduct',
    async ({formValue, id}, options)=>{
       
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.patch(`${conf.backendBaseUrl}/products/${id}`, formValue, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            })

            const updatedProduct = response.data;


            return updatedProduct;
        } catch (error) {
           
            throw options.rejectWithValue(error?.response?.data)
        }
    

    }
)


export const deleteUserProduct = createAsyncThunk(
    'profile/deleteUserProduct',
    async (id, options)=>{
        
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.delete(`${conf.backendBaseUrl}/products/${id}`, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            })

            const deletedProduct = response.data;
            return deletedProduct;
        } catch (error) {
          
            throw options.rejectWithValue(error?.response?.data)
        }
    

    }
)


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
       setUserEditable: (state, action)=>{
        state.userEditable = true;
       },
       setIsProductCreated: (state)=>{
        state.isProductCreated = false;
       },
       setProductEditKey: (state, action)=>{
        state.productEditKey = action.payload
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(getCurrentUser.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.currentUser = action.payload;
        })
        .addCase(getCurrentUser.rejected, (state, action)=>{
            state.status = action.payload;
        })
        .addCase(editCurrentUser.pending, (state)=>{
          state.status = 'loading';
        })
        .addCase(editCurrentUser.fulfilled, (state, action)=>{
            state.currentUser = action.payload
            state.userEditable = false
            state.status = "idle"
        })
        .addCase(editCurrentUser.rejected, (state, action)=>{
           
            state.status = action.payload
        })
        .addCase(createProduct.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(createProduct.fulfilled, (state, action)=>{
              state.isProductCreated = true
          })
          .addCase(createProduct.rejected, (state, action)=>{
          
              state.status = action.payload
              state.isProductCreated = false
          })
          .addCase(getUserProducts.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(getUserProducts.fulfilled, (state, action)=>{
              state.userProducts = action.payload
          })
          .addCase(getUserProducts.rejected, (state, action)=>{
         
              state.status = action.payload
          })
          .addCase(updateUserProduct.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(updateUserProduct.fulfilled, (state, action)=>{
          
           const index = state.userProducts.findIndex((elem)=> elem._id === action.payload._id);

           state.userProducts.splice(index, 1, action.payload);

              state.productEditKey = null
          })
          .addCase(updateUserProduct.rejected, (state, action)=>{
           
              state.status = action.payload
          })
          .addCase(deleteUserProduct.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(deleteUserProduct.fulfilled, (state, action)=>{
           
           const index = state.userProducts.findIndex((elem)=> elem._id === action.payload._id);

           state.userProducts.splice(index, 1);
          })
          .addCase(deleteUserProduct.rejected, (state, action)=>{
           
              state.status = action.payload
          })
    }
})

export const {setUserEditable, setIsProductCreated, setProductEditKey} = profileSlice.actions

const profileReducer = profileSlice.reducer

export default profileReducer