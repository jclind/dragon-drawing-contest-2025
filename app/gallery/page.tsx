import React from 'react'
import styles from './page.module.scss'
import { submissions } from '@/data/submissions'

const GalleryPage = () => {
  return (
    <div className={styles.GalleryPage}>
      <div className='background'></div>
      <h1>All Submissions:</h1>
      <div className={styles.list}>
        {submissions.map(dragon => {
          return (
            <div className={styles.dragonItem} key={dragon.creator}>
              <div className={styles.imageContainer}>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryPage
