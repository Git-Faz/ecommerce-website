import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    email: string;
    role: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

const loadInitialState = (): AuthState => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 > Date.now()) {
                return {
                    token,
                    user: JSON.parse(user),
                };
            }
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }

    return { user: null, token: null };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;