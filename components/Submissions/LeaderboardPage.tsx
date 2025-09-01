'use client'

import { getTopVotes, VoteCount } from '@/lib/votes'
import styles from './Submissions.module.scss'
import { useEffect, useState } from 'react'
import { categories } from '@/data/categories'
import { usePathname } from 'next/navigation'

const CategoryLeaderboard = ({ categoryID }: { categoryID: string }) => {
  const [topVotes, setTopVotes] = useState<VoteCount[]>([])

  const categoryName = categories.find(cat => cat.id === categoryID)?.name || ''

  useEffect(() => {
    async function fetchTop() {
      const top = await getTopVotes(categoryID, 3)
      setTopVotes(top)
    }
    fetchTop()
  }, [categoryID])

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }
    setVH()
    window.addEventListener('resize', setVH)
    return () => window.removeEventListener('resize', setVH)
  }, [])

  return (
    <div className={styles.singleLeaderboard}>
      <h3>{categoryName}</h3>
      <ol>
        {topVotes.map(v => (
          <li key={v.dragonId}>
            {v.dragonId} — {v.count} vote{v.count > 1 ? 's' : ''}
          </li>
        ))}
      </ol>
    </div>
  )
}

const LeaderboardPage = () => {
  const pathname = usePathname()

  const isNotHome = pathname !== '/'
  return (
    <div className={styles.leaderboardPage}>
      {!isNotHome && (
        <>
          <h1>Your Votes Have Been Cast!</h1>
          <div className={styles.imageContainer}>
            <img src='/images/dragon-success.webp' alt='happy dragon' />
          </div>
        </>
      )}
      <h2>Category Leaderboards:</h2>
      <div className={styles.leaderboardList}>
        {/* <div className={styles.Leaderboards}></div> */}
        {categories.map(cat => {
          return <CategoryLeaderboard categoryID={cat.id} key={cat.id} />
        })}
      </div>
    </div>
  )
}

export default LeaderboardPage
