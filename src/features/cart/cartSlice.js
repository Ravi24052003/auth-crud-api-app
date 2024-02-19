import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../../conf/conf";

const initialState = {
    status: 'idle',
    cartProducts: []
}

export const cartAsync = createAsyncThunk(
    'cart/fetchcart',
    async (formVal=null, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/products/cartProducts`, {
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            });
            const cartProducts = response.data;
            return cartProducts;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const changeQuantityAsync = createAsyncThunk(
    'cart/changeQuantity',
    async ({id, quantity=1}, options)=>{

        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

        const response = await axios.patch(`${conf.backendBaseUrl}/products/changeQuantity/${id}`,{
            quantity
        }, {
            headers: {
                Authorization: "Bearer "+tokenObj?.token
            }
        });

        const changedProduct = response.data;
        return changedProduct;
        } catch (error) {
            throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, options)=>{
      try {
        const tokenObj =  JSON.parse(localStorage.getItem('token'));

        const response = await axios.delete(`${conf.backendBaseUrl}/products/removeFromCart/${id}`, {
            headers: {
                Authorization: "Bearer "+tokenObj?.token
            }
        });

        const removedItem = response.data;

        return removedItem;
      } catch (error) {
        throw options.rejectWithValue(error?.response?.data)
      }
    }
)


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(cartAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(cartAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
               state.cartProducts = action.payload;
        })
        .addCase(cartAsync.rejected, (state, action)=>{
            state.status = action.payload;
        })
        .addCase(changeQuantityAsync.pending, (state)=>{
           state.status = 'loading';
        })
        .addCase(changeQuantityAsync.fulfilled, (state, action)=>{

            state.cartProducts.map((elem)=>{
                if(elem._id == action.payload._id){
                    elem.quantity = action.payload?.quantity
                }
            })

            state.status = 'idle';
           
        })
        .addCase(changeQuantityAsync.rejected, (state, action)=>{
       

           state.status = action.payload;
        })

        .addCase(removeFromCart.pending, (state)=>{
        
        })
        .addCase(removeFromCart.fulfilled, (state, action)=>{
         
             const index = state.cartProducts.findIndex((elem)=>elem._id == action.payload);

             state.cartProducts.splice(index, 1);
        })
        .addCase(removeFromCart.rejected, (state, action)=>{
          state.status = action.payload
        })
    }
})


const cartReducer = cartSlice.reducer

export default cartReducer