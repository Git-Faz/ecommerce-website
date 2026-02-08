import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { login as loginApi } from "@/api/authApi";

export interface User {
    id: number;
    email: string;
    role: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
    status: "idle" | "loading" | "error";
    error: string | null
}

const loadInitialState = (): AuthState => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 > Date.now()) {
                return {
                    user: JSON.parse(user),
                    token,
                    status: "idle",
                    error: null,
                };
            }
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }

    return { user: null, token: null, status:'idle', error:null };
};

const initialState: AuthState = loadInitialState();

export const login = createAsyncThunk(
    'auth/login', //type
    async(credentials:{username: string, password: string}, {rejectWithValue}) => { //async func / payloadCreator
        try{
            const {data} = await loginApi(credentials)
            return data;
        } catch (err: any) {
            if(err.response?.status === 401 || err.response?.status === 403){
                return rejectWithValue("Invalid username or password")
            }
            return rejectWithValue("Login failed")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                const user = action.payload.user;
                const token = action.payload.token;

                state.user = user;
                state.token = token;
                state.status = "idle"

                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
            })
            .addCase(login.rejected, (state, action)=> {
                state.status = "error"
                state.error = (action.payload as string) ?? "something went wrong";
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;