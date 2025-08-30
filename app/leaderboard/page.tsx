'use client'

import LeaderboardPage from '@/components/Submissions/LeaderboardPage'
import React from 'react'
import styles from './page.module.scss'

const LeaderboardRoute = () => {
  return (
    <div className={`${styles.LeaderboardRoute} page`}>
      <div className='background'></div>
      <div className='card'>
        <LeaderboardPage />
      </div>
    </div>
  )
}

export default LeaderboardRoute
