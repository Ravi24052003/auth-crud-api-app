import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {},
    isJWTexpired: false,
    isJWTmalformed: false
}

const cartChangeQnErr = createAction("cart/changeQuantity/rejected");
const productAddToCartRej = createAction("products/addToCart/rejected");
const cartAsyncRejected = createAction("cart/fetchcart/rejected");
const productAsyncRejected = createAction("products/fetchProducts/rejected");
const fetchUserRejected = createAction("user/fetchUser/rejected");
const likeAsyncRejected = createAction("like/fetchLike/rejected");
const removeFromCartRejected = createAction("cart/removeFromCart/rejected");
const updateUserProductRejected = createAction("profile/updateUserProduct/rejected");
const getCurrentUserRejected = createAction("profile/fetchUser/rejected");
const createProductRejected = createAction("profile/createProduct/rejected");
const deleteUserProductRejected = createAction("profile/deleteUserProduct/rejected");
const editCurrentUserRejected = createAction("profile/editUser/rejected");
const getUserProductsRejected = createAction("profile/getProducts/rejected");
const getAllUsersRejected = createAction("users/fetchUsers/rejected");
const signupFulfilled = createAction("signup/fetchToken/fulfilled");

export const loginAsync = createAsyncThunk(
    'login/fetchToken',
    async (formVal, options) => {
        try {
            const response = await axios.post(`${conf.backendBaseUrl}/auth/login`, formVal);
          
            const token = response.data;
            return token;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       setTokenState: (state)=>{
        state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                state.isJWTexpired = false;
               localStorage.setItem('token', JSON.stringify(action.payload));
               state.isJWTmalformed = false;
        })
        .addCase(loginAsync.rejected, (state, action)=>{
          
            state.status = action.payload;
        })
        .addCase(cartChangeQnErr, (state, action)=>{
          

            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(productAddToCartRej, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
                
            }
        })
        .addCase(cartAsyncRejected, (state, action)=>{
        
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(productAsyncRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(fetchUserRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(likeAsyncRejected, (state, action)=>{
       
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(removeFromCartRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(updateUserProductRejected, (state, action)=>{
          
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(getCurrentUserRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(createProductRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(deleteUserProductRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(editCurrentUserRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(getUserProductsRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(getAllUsersRejected, (state, action)=>{
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })
        .addCase(signupFulfilled, (state, action)=>{
            state.isJWTexpired = false
            state.isJWTmalformed = false
        })
    }
})

export const {setTokenState} = loginSlice.actions 

const loginReducer = loginSlice.reducer

export default loginReducer