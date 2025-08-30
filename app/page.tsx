import CategoriesList from '@/components/CategoriesList'
import styles from './page.module.scss'
import Submissions from '@/components/Submissions'

export default function Home() {
  return (
    <div className='page'>
      <div className='background'></div>
      <h1 className='page-header'>MATEO&apos;S DRAGON DRAWING CONTEST 2025</h1>
      <Submissions />
    </div>
  )
}
