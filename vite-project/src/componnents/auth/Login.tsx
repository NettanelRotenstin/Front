import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchLogin } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    useEffect(() => {
        if (!user?._id) return
        navigate('/votes')

    }, [user])
    useEffect(() => {
        if (user?._id)
            navigate('/votes')
    }, [])
    return (
        <div>
            <input type="text" placeholder='user name' value={username} onChange={(e) => setusername(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
            <button onClick={() => dispatch(fetchLogin({ userName: username, password }))}>Log in</button>
        </div>
    )
}
