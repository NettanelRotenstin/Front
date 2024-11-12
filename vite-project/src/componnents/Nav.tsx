import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import userSlice from '../redux/userSlice'
export default function Nav() {
    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(userSlice.actions.logOut())
        navigate('/login')
    }
    return (
        <div className='nav'>
            {user.user ? (
                <>
                    <NavLink to={"/votes"} >Votes</NavLink>
                    {user.user.isAdmin && (<NavLink to={"/statistics"} >Statistics</NavLink>)}
                    <button onClick={() => logOut()}>logout</button>
                </>) : <>
                <NavLink to={"/login"} >Login</NavLink>
                <NavLink to={"/register"} >Register</NavLink>
            </>}
        </div>
    )
}