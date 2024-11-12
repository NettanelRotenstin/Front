import React, { useEffect } from 'react'
import Nav from './componnents/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './componnents/auth/Login'
import Statistics from './componnents/pages/Statistics'
import Votes from './componnents/pages/Votes'
import Register from './componnents/auth/Register'
import { socket } from './main'
import { useDispatch } from 'react-redux'
import { fetchCandidates } from './redux/candidateSlice'
import { useAppDispatch } from './redux/store'

export default function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    socket.on("newVoteAddad",()=>{
      dispatch(fetchCandidates())
    })
  },[])
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='votes' element={<Votes />} />
        <Route path='statistics' element={<Statistics />} />
        <Route path='/' element={<Navigate to={"/login"} />} />
      </Routes>

    </div>
  )
}
