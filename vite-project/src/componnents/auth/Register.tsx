import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from '../../redux/userSlice'

export default function Register() {
  const user = useAppSelector(state => state.user.user)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [admin, setadmin] = useState(false)
  const dispatch = useAppDispatch()
  
  const clk = ()=>{
    dispatch(fetchRegister({ userName: username, password, isAdmin: admin }))
    navigate('/login')
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (user?._id) {
      navigate('/votes')
    }
  }, [])
  return (
    <div>
      <input type="text" placeholder='user name' value={username} onChange={(e) => setusername(e.target.value)} />
      <input type="text" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
      <input type="checkbox" checked={admin} onChange={(e) => setadmin(e.target.checked)} />
      <button onClick={clk}>Register</button>
    </div>
  )
}
