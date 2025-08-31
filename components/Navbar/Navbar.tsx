import React from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <Link href='/'>Home</Link>
          <span></span>
          <Link href='/leaderboard'>Leaderboard</Link>
          <span></span>
          <Link href='/gallery'>Gallery</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
