// lib/votes.ts
import { UserVotesType } from '@/app/Submissions/Submissions'
import { db } from './firebase'
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { getUserFromLocalStorage } from '@/util/localStorageFns'

export async function submitUserVotes(votes: UserVotesType[]) {
  const { id: userID, name: userName } = getUserFromLocalStorage() || {
    id: '',
    name: '',
  }
  const batchPromises = votes.map(vote => {
    const voteDocId = `${userID}_${vote.id}`
    const voteRef = doc(db, 'votes', voteDocId)
    return setDoc(voteRef, {
      userID,
      userName,
      categoryId: vote.id,
      dragonId: vote.votedOnDragonID,
      createdAt: serverTimestamp(),
    })
  })

  await Promise.all(batchPromises)
}

export type VoteCount = {
  dragonId: string
  count: number
}

export async function getTopVotes(
  categoryId: string,
  topN: number = 3
): Promise<VoteCount[]> {
  const votesRef = collection(db, 'votes')
  const q = query(votesRef, where('categoryId', '==', categoryId))
  const snapshot = await getDocs(q)

  // Count votes per dragon
  const tally: Record<string, number> = {}
  snapshot.forEach(doc => {
    const data = doc.data()
    const dragonId = data.dragonId
    if (!tally[dragonId]) tally[dragonId] = 0
    tally[dragonId]++
  })

  // Convert to array and sort by votes descending
  const sorted = Object.entries(tally)
    .map(([dragonId, count]) => ({ dragonId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN) // top N

  return sorted
}
