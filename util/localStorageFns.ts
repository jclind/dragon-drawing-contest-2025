import { defaultUserVotes, UserVotesType } from '@/app/Submissions/Submissions'

const LS_USER_STRING = 'mateos_dragon_drawing_contest_user'

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
    id: crypto.randomUUID(), // generates unique ID
    name,
    votes: defaultUserVotes, // empty votes by default
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(LS_USER_STRING, JSON.stringify(newUser))
}

export const addUserVotesToLocalStorage = (newVotes: UserVotesType[]) => {
  const user: LSUserType | null = getUserFromLocalStorage()
  if (!user) return console.error('USER NOT FOUND, SOMETHING WENT WRONG')

  user.votes = newVotes
}
