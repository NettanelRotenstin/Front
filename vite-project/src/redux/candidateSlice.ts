import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { candidateState, DataStatus } from "../types/redux"
import { IUser } from "../types/User"
import { json } from "react-router-dom"
import { ICandidate } from "../types/Candidate"

const initialData: candidateState = {
    error: null,
    status: DataStatus.IDLE,
    candidate: []
}

export const fetchCandidates = createAsyncThunk('candidates/',
    async (_, thunkApi) => {
        try {
            const res = await fetch('http://localhost:3333/api/candidates/')
            if (!res.ok) {
                thunkApi.rejectWithValue("cant canditates")
            }
            const data = await res.json()
            thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue("")
        }
    }
)




const candidateSlice = createSlice({
    name: "candidates",
    initialState: initialData,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => {
        builder.addCase(fetchCandidates.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = null
            state.candidate = []
        })
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.error = null
                state.candidate = action.payload as unknown as ICandidate[]
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.candidate = []
            })
    }
})

export default candidateSlice