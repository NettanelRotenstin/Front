import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchCandidates } from '../../redux/candidateSlice'
import VoteCard from './VoteCard'
import { ICandidate } from '../../types/Candidate'

export default function Votes() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { candidate } = useAppSelector(state => state.candidate)

    useEffect(() => {
        if (!user?._id) {
            navigate('/login')
        }
        dispatch(fetchCandidates())
    }, [])
    return (
        <div className='vote-list'>
            {candidate.length && candidate.map((candidate: ICandidate) => (
                <VoteCard key={candidate._id} candidate={candidate} />
            ))}
        </div>
    )
}
