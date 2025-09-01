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
  const [test, setTest] = useState('')

  const handleSetUserName = () => {
    if (!userName) return
    createLocalStorageUser(userName)
    setLocalStorageUserExists(true)
  }

  return (
    <div className={styles.registerVoterPage}>
      <h2>Enter Your Voter Name</h2>
      test: {test}
      <div>
        <input value={userName} onChange={e => setUserName(e.target.value)} />
        <button
          onClick={e => {
            e.preventDefault()
            setTest('What?')
            handleSetUserName()
          }}
          disabled={!userName}
        >
          Confirm Name
        </button>
      </div>
    </div>
  )
}

export default RegisterVoterPage
