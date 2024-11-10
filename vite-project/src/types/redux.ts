import { ICandidate } from "./Candidate"
import { IUser } from "./User"

export enum DataStatus {
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    IDLE = "IDLE"
}

export interface candidateState {
    error: null | string
    candidate:ICandidate[]
    status: DataStatus
}

interface userState {
    error: string | null
    status: DataStatus
    user: null | IUser
}