import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DataStatus } from "../types/redux"
import { IUser } from "../types/User"
import { json } from "react-router-dom"

interface userState {
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
            thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue("")
        }
    }
)




const userSlice = createSlice({
    name: "user",
    initialState: initialData,
    reducers: {},
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
            })
    }
})

export default userSlice