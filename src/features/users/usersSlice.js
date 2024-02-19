import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../../conf/conf";

const initialState = {
    status: 'idle',
    users: []
}

export const getAllUsers = createAsyncThunk(
    'users/fetchUsers',
    async (formVal=null, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.backendBaseUrl}/users`,{
                headers: {
                    Authorization: "Bearer "+tokenObj?.token
                }
            });
          
            const users = response.data;
            return users;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.users = action.payload
        })
        .addCase(getAllUsers.rejected, (state, action)=>{
            state.status = action.payload;
        })
    }
})

const usersReducer = usersSlice.reducer

export default usersReducer