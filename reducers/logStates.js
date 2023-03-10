import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
   log: false
}
export const userSlice = createSlice({
    name:'logStated',
    initialState,
    reducers:{
        login:(state, action) => {
            state.value.token = action.payload.token;
            state.value.username= action.payload.username;
        },
        logout: (state) => {
            state.value.token= null;
            state.value.username = null;
        }
    }
})
export const {login, logout} = userSlice.actions;
export default userSlice.reducer;