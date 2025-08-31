'use client'

import { categories } from '@/data/categories'
import { UserVotesType } from './Submissions'
import styles from './Submissions.module.scss'
import { submissions } from '@/data/submissions'

const ConfirmVotesPage = ({ userVotes }: { userVotes: UserVotesType[] }) => {
  return (
    <div className={styles.confirmPage}>
      <h2>Confirm Your Votes:</h2>
      <div className={styles.votes}>
        {userVotes.map(vote => {
          const categoryID = vote.id
          const categoryName =
            categories.find(cat => cat.id === categoryID)?.name || 'drawing'
          const dragon = submissions.find(
            sub => sub.id === vote.votedOnDragonID
          )
          const dragonSrc = dragon?.imageSrc || '#'
          return (
            <div className={styles.categoryVote} key={categoryName}>
              <label>{categoryName}:</label>
              <div className={styles.imageContainer}>
                <img src={dragonSrc} alt='' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConfirmVotesPage
