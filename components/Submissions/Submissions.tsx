'use client'

import React, { useEffect, useState } from 'react'
import styles from './Submissions.module.scss'
import { submissions } from '@/data/submissions'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { submitUserVotes } from '@/lib/votes'
import { categories, CategoryType } from '@/data/categories'
import LeaderboardPage from './LeaderboardPage'
import RegisterVoterPage from './RegisterVoterPage'
import ConfirmVotesPage from './ConfirmVotesPage'
import {
  addUserVotesToLocalStorage,
  getUserFromLocalStorage,
  getUserVotesFromLocalStorage,
  hasUserCastVotes,
} from '@/util/localStorageFns'
import CategoriesList from '../CategoriesList'
import Link from 'next/link'

export type UserVotesType = { id: string; votedOnDragonID: string | null }

export const defaultUserVotes: UserVotesType[] = categories.map(cat => ({
  id: cat.id,
  votedOnDragonID: null,
}))

const Submissions = () => {
  const [currCategory, setCurrCategory] = useState<
    (typeof categories)[0] | null
  >(categories[0])
  const currCategoryIndex = categories.findIndex(
    cat => cat.id === currCategory?.id
  )
  const [castVoteID, setCastVoteID] = useState<string | null>(null)
  const [userVotes, setUserVotes] = useState<UserVotesType[]>(() => {
    const lsVotes = getUserVotesFromLocalStorage()
    console.log('lsVotes', lsVotes)
    if (lsVotes) return lsVotes
    return defaultUserVotes
  })
  const [isConfirmPage, setIsConfirmPage] = useState(false)
  const [localStorageUserExists, setLocalStorageUserExists] = useState(
    !!getUserFromLocalStorage()
  )
  const [isLeaderboardPage, setIsLeaderboardPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false)

  const hasVoted = hasUserCastVotes()

  const isLastCategory =
    categories[categories.length - 1].id === currCategory?.id
  const isFirstCategory = categories[0].id === currCategory?.id

  const getPrevCategory = (currentID: string) => {
    const index = categories.findIndex(cat => cat.id === currentID)

    if (index === -1 || index === 0) {
      return null // not found OR first one
    }

    return categories[index - 1]
  }
  const getNextCategory = (currentID: string) => {
    const index = categories.findIndex(cat => cat.id === currentID)

    if (index === -1 || index === categories.length - 1) {
      return null // not found OR last one
    }

    return categories[index + 1]
  }

  const handleDragonVote = (dragonID: string, categoryID: string) => {
    setCastVoteID(dragonID)
    setUserVotes(prevVotes =>
      prevVotes.map(vote =>
        vote.id === categoryID
          ? { ...vote, votedOnDragonID: dragonID } // update only that category
          : vote
      )
    )
  }

  useEffect(() => {
    console.log('userVotes', userVotes)
  }, [userVotes])
  useEffect(() => {
    console.log('currCategory', currCategory)
  }, [currCategory])
  useEffect(() => {
    console.log('castVoteID', castVoteID)
  }, [castVoteID])

  const handlePrevCategoryClick = (category: CategoryType | null) => {
    window.scrollTo(0, 0)
    if (!category || isConfirmPage) {
      const lastUserVote = userVotes[userVotes.length - 1]
      const category =
        categories.find(cat => cat.id === lastUserVote.id) ||
        categories[categories.length - 1]
      setCurrCategory(category)
      setIsConfirmPage(false)
      return setCastVoteID(lastUserVote.votedOnDragonID)
    }

    const categoryID = category.id
    const prevCategory = getPrevCategory(categoryID)

    const newDragonID =
      userVotes.find(vote => vote.id === prevCategory?.id)?.votedOnDragonID ||
      null
    setCurrCategory(prevCategory)
    setCastVoteID(newDragonID)
  }

  const handleNextCategoryClick = (category: CategoryType | null) => {
    window.scrollTo(0, 0)
    if (!category) return null
    if (isLastCategory) {
      setCurrCategory(null)
      setCastVoteID(null)
      return setIsConfirmPage(true)
    }

    const categoryID = category.id
    const nextCategory = categoryID ? getNextCategory(categoryID) : null

    const newDragonID =
      userVotes.find(vote => vote.id === nextCategory?.id)?.votedOnDragonID ||
      null
    setCurrCategory(nextCategory)
    setCastVoteID(newDragonID)
  }

  const handleSubmitVotes = () => {
    setLoading(true)
    submitUserVotes(userVotes)
      .then(() => {
        addUserVotesToLocalStorage(userVotes)
        setIsLeaderboardPage(true)
        setIsConfirmPage(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const showVotingToolbar =
    (castVoteID || !isFirstCategory) && !isLeaderboardPage

  return (
    <>
      <div className={`${styles.Submissions} card`}>
        {hasVoted || isLeaderboardPage ? (
          <>
            <LeaderboardPage />
            <Link href='/gallery' className={styles.viewAllLink}>
              View All Submissions
            </Link>
          </>
        ) : !localStorageUserExists ? (
          <RegisterVoterPage
            setLocalStorageUserExists={setLocalStorageUserExists}
          />
        ) : isConfirmPage ? (
          <ConfirmVotesPage userVotes={userVotes} />
        ) : isLeaderboardPage ? (
          <>
            <LeaderboardPage />
            hello testing
          </>
        ) : (
          <>
            <h2 className={styles.submissionsTitle}>Submissions</h2>
            <p className={styles.description}>
              Vote for which dragon best represents the current category.
            </p>
            <div className={styles.categoryName}>
              <button onClick={() => setIsCategoriesVisible(prev => !prev)}>
                <label>
                  Category ({currCategoryIndex + 1} / {categories.length}):
                </label>
                <span>{currCategory?.name}</span>
                {isCategoriesVisible ? (
                  <ChevronUp className={styles.icon} />
                ) : (
                  <ChevronDown className={styles.icon} />
                )}
              </button>
              {isCategoriesVisible && (
                <CategoriesList selectedCategory={currCategory} />
              )}
            </div>
            <div className={styles.list}>
              {submissions.map(dragon => {
                return (
                  <div className={styles.dragonItem} key={dragon.creator}>
                    <div className={styles.imageContainer}>
                      {dragon.id === castVoteID && (
                        <div className={styles.selectedCheck}>
                          <Check />
                        </div>
                      )}
                      <img src={dragon.imageSrc} alt='' />
                    </div>
                    <div className={styles.dragonName}>{dragon.dragonName}</div>
                    <div className={styles.artist}>
                      <label htmlFor=''>drawn by </label>
                      <span>{dragon.creator}</span>
                    </div>

                    <div className={styles.info}>
                      {dragon.dragonDescription && (
                        <div className={`${styles.row} ${styles.description}`}>
                          <label htmlFor=''>Description:</label>
                          <span>{dragon.dragonDescription}</span>
                        </div>
                      )}
                      {dragon.dragonInfo?.map(stat => {
                        return (
                          <div
                            className={`${styles.row} ${styles.stat}`}
                            key={stat.key}
                          >
                            <label htmlFor=''>{stat.key}:</label>
                            <span>{stat.value}</span>
                          </div>
                        )
                      })}
                    </div>
                    <button
                      onClick={() =>
                        handleDragonVote(dragon.id, currCategory?.id || '')
                      }
                      className={
                        castVoteID === dragon.id ? styles.selected : ''
                      }
                    >
                      {!castVoteID
                        ? 'Cast Vote'
                        : castVoteID === dragon.id
                        ? 'Dragon Selected'
                        : 'Switch Vote'}
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
      {showVotingToolbar ? (
        <div className={`${styles.nextCategoryContainer} card`}>
          {!isFirstCategory && (
            <button
              disabled={loading}
              onClick={() => handlePrevCategoryClick(currCategory)}
            >
              Prev Category
            </button>
          )}
          {castVoteID && !isConfirmPage && (
            <button
              disabled={loading}
              onClick={() => handleNextCategoryClick(currCategory)}
            >
              {isLastCategory ? 'Confirm Votes Page' : 'Next Category'}
            </button>
          )}
          {isConfirmPage && (
            <button disabled={loading} onClick={handleSubmitVotes}>
              {loading ? 'loading...' : 'Submit Votes!'}
            </button>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Submissions
