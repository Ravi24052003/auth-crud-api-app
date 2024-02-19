import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../../conf/conf";

const initialState = {
    products: [],
    status: 'idle',
    currentUser: {},
    productsInCart: []
}

export const productsAsync = createAsyncThunk(
    'products/fetchProducts',
    async (formVal=null, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/products`, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            });
            const products = response.data;
            return products;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const addToCart = createAsyncThunk(
    'products/addToCart',
    async({id, quantity=1}, options)=>{
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.patch(`${conf.backendBaseUrl}/products/addToCart/${id}`,{
               quantity
            }, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw options.rejectWithValue(error?.response?.data)
        }
    }
)


export const likeAsync = createAsyncThunk(
    'like/fetchLike',
    async (id, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/products/likeProduct/${id}`,{
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            } );
            const product = response.data;
            return product;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const userAsync = createAsyncThunk(
    'user/fetchUser',
    async (data=null, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/users/user`,{
             headers: {
                Authorization: "Bearer "+tokenObj?.token
             }
            });
           
            const user = response.data;
            return user;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       setStatusIdle: (state, action)=>{
        state.status = "idle"
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(productsAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(productsAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                
               state.products = action.payload;
        })
        .addCase(productsAsync.rejected, (state, action)=>{
            state.status = action.payload;
        })
        .addCase(addToCart.pending, (state)=>{
           state.status = 'idle';
        })
        .addCase(addToCart.fulfilled, (state, action)=>{
           state.status = 'idle';
           state.currentUser = action.payload;
           state.productsInCart = action.payload.cart;
        })
        .addCase(addToCart.rejected, (state, action)=>{
         state.status = action.payload;
       
        })
        .addCase(userAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(userAsync.fulfilled, (state, action)=>{
            state.status = "idle"
            state.currentUser = action.payload
            state.productsInCart = action.payload.cart;
        })
        .addCase(userAsync.rejected, (state, action)=>{
            state.status = action.payload
        })
        .addCase(likeAsync.pending, (state) => {
            state.status = 'idle';
    })
    .addCase(likeAsync.fulfilled, (state, action)=>{
            state.status = 'idle';
            state.products.map((product)=>{
                if(product._id === action.payload._id){
                    product.likes = action.payload.likes
                }
            })
    })
    .addCase(likeAsync.rejected, (state, action)=>{
        state.status = action.payload;
    })
    }
})

export const {setStatusIdle} = productsSlice.actions

const productsReducer = productsSlice.reducer

export default productsReducer