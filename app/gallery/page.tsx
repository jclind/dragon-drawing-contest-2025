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
              <div className={styles.info}>
                <div className={styles.row}>
                  <label htmlFor=''>Artist:</label>
                  <span>{dragon.creator}</span>
                </div>
                {dragon.dragonName && (
                  <div className={styles.row}>
                    <label htmlFor=''>Dragon Name:</label>
                    <span>{dragon.dragonName}</span>
                  </div>
                )}
                {dragon.dragonDescription && (
                  <div className={styles.row}>
                    <label htmlFor=''>Dragon Description:</label>
                    <span>{dragon.dragonDescription}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryPage
