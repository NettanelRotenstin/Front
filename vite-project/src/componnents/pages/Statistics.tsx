import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

export default function Statistics() {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)

    useEffect(()=>{
        if(user?._id && !user.isAdmin){
            navigate('/votes')
        }
        if(!user?._id){
            navigate('/login')
        }
    },[])
  return (
    <div>Statistics</div>
  )
}
