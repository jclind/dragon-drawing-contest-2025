'use client'

import {
  defaultUserVotes,
  UserVotesType,
} from '@/components/Submissions/Submissions'
import { v4 as uuidv4 } from 'uuid'

const LS_USER_STRING = 'mateos_dragon_drawing_contest_user_v2'

type LSUserType = {
  id: string
  name: string
  votes: UserVotesType[]
  createdAt: string
}

export const getUserFromLocalStorage = (): LSUserType | null => {
  if (typeof window === 'undefined') return null // SSR safety

  const storedUser = localStorage.getItem(LS_USER_STRING)

  if (storedUser) {
    return JSON.parse(storedUser) as LSUserType
  }

  return null
}
export const getUserVotesFromLocalStorage = () => {
  const storedUser = getUserFromLocalStorage()

  return storedUser ? storedUser.votes : null
}

export const createLocalStorageUser = (name: string) => {
  const newUser = {
    id: uuidv4(), // generates unique ID
    name,
    votes: defaultUserVotes, // empty votes by default
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(LS_USER_STRING, JSON.stringify(newUser))
}

export const addUserVotesToLocalStorage = (newVotes: UserVotesType[]) => {
  const user: LSUserType | null = getUserFromLocalStorage()
  if (!user) return console.error('USER NOT FOUND, SOMETHING WENT WRONG')
  const updatedUser = { ...user, votes: newVotes }
  localStorage.setItem(LS_USER_STRING, JSON.stringify(updatedUser))
}

export const hasUserCastVotes = () => {
  const user = getUserFromLocalStorage()
  if (!user) return false

  return user.votes.every(
    vote => vote.votedOnDragonID !== null && vote.votedOnDragonID !== ''
  )
}
function uuid() {
  throw new Error('Function not implemented.')
}
