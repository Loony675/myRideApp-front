import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    value: {token:null, username:null, loggedIn:false}
}
export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        login:(state, action) => {
            state.value.loggedIn= action.payload.loggedIn;
            state.value.token = action.payload.token;
            state.value.username= action.payload.username;
        },
        logout: (state) => {
            state.value.loggedIn = false
            state.value.token= null;
            state.value.username = null;
        }
    }
})
export const {login, logout} = userSlice.actions;
export default userSlice.reducer;