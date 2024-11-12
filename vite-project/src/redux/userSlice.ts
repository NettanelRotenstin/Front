import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DataStatus } from "../types/redux"
import { IUser } from "../types/User"
import { json } from "react-router-dom"

interface userState {
    _id?: string
    error: string | null
    status: DataStatus
    user: null | IUser
}

const initialData: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null
}

export const fetchLogin = createAsyncThunk('user/login',
    async (user: { userName: string, password: string }, thunkApi) => {
        try {
            const res = await fetch('http://localhost:3333/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/Json"
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("cant login")
            }
            const data = await res.json()
            const token = data.token
            localStorage.setItem('token', token)
            return data
        } catch (error) {
            thunkApi.rejectWithValue("cant login")
        }
    }
)

export const fetchRegister = createAsyncThunk(
    "users/register",
    async (user: { userName: string; password: string, isAdmin: boolean }, thunkApi) => {
        try {
            const res = await fetch("http://localhost:3333/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Cant create new user ,please try again");
            }

        } catch (err) {
            thunkApi.rejectWithValue(`Cant create new user ,please try again${err}`);
        }
    }
);

export const fetchProfileUpdate = createAsyncThunk(
    "user/profile",
    async (id: string, thunkApi) => {
        try {
            const res = await fetch("http://localhost:3333/api/users/profile", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage["Authorization"]!,
                },
                body: JSON.stringify({ id }),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't update profile, please try again");
            }
            const data = await res.json();
            return data;
        } catch (err) {
            thunkApi.rejectWithValue("Can't login, please try again");
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: initialData,
    reducers: {
        logOut: (state) => {
            state.user = null
            state.error = null
            state.status = DataStatus.IDLE
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = null
            state.user = null
        })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.error = null
                state.user = action.payload as unknown as IUser
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            }).addCase(fetchRegister.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = null
                state.user = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.error = null
                state.user = null
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            })

    }
})

export default userSlice