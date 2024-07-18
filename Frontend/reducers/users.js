import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { firstname: null, token: null, username: null, isConnected: false },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.firstname = action.payload.firstname;
            state.value.username = action.payload.username;
            state.value.isConnected = true;
            console.log('firstname from reducer :', action.payload.firstname)
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
            state.value.isConnected = false;
            state.value.firstname = null
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;