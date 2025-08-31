'use client'

import { createLocalStorageUser } from '@/util/localStorageFns'
import { useState } from 'react'
import styles from './Submissions.module.scss'

const RegisterVoterPage = ({
  setLocalStorageUserExists,
}: {
  setLocalStorageUserExists: (val: boolean) => void
}) => {
  const [userName, setUserName] = useState('')

  const handleSetUserName = () => {
    if (!userName) return
    createLocalStorageUser(userName)
    setLocalStorageUserExists(true)
  }

  return (
    <div className={styles.registerVoterPage}>
      <h2>Enter Your Voter Name</h2>
      <form action=''>
        <input value={userName} onChange={e => setUserName(e.target.value)} />
        <button onClick={handleSetUserName} disabled={!userName}>
          Confirm Name
        </button>
      </form>
    </div>
  )
}

export default RegisterVoterPage
