import styles from './page.module.scss'
import Submissions from './Submissions'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.background}></div>
      <h1>MATEO&apos;S DRAGON DRAWING CONTEST 2025</h1>
      <Submissions />
    </div>
  )
}
