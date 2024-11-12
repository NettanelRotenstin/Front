import React from "react";
 
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ICandidate } from "../../types/Candidate";
import { fetchCandidates } from "../../redux/candidateSlice";
import { fetchProfileUpdate } from "../../redux/userSlice";
import { socket } from "../../main";
 

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    try {
      const data = await fetch("http://localhost:3333/api/votes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.token
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      });
      dispatch(fetchCandidates());
      dispatch(fetchProfileUpdate(user?._id!));
      socket.emit("newVote")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`vote-card ${
        user?.votedFor === candidate._id ? "my-vote" : ""
      }`}
    >
      <h1>
        <img src={candidate.image} />
        <p>{candidate.name}</p>
        <span className="badge">{candidate.votes}</span>
      </h1>

      <button onClick={handleVote} disabled={user?.hasVoted}>VOTE</button>
    </div>
  );
}