import React from 'react'
import styles from './CategoriesList.module.scss'
import { categories, CategoryType } from '@/data/categories'

const CategoriesList = ({
  selectedCategory,
}: {
  selectedCategory: CategoryType | null
}) => {
  const isActive = selectedCategory !== null

  return (
    <div className={styles.CategoriesList}>
      <div className={`${styles.contentCard}`}>
        <div className={styles.list}>
          {categories.map((cat, index) => {
            const selectedCategoryID = selectedCategory?.id || ''
            const isSelected = selectedCategoryID === cat.id

            return (
              <div
                className={`${styles.category} ${
                  isActive ? styles.active : ''
                } ${isSelected ? styles.selected : ''}`}
                key={cat.id}
              >
                <span className={styles.number}>{index + 1}.</span>
                {cat.name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoriesList
// import React from 'react'
// import styles from './CategoriesList.module.scss'
// import { categories, CategoryType } from '@/data/categories'

// const CategoriesList = ({
//   selectedCategory,
// }: {
//   selectedCategory: CategoryType | null
// }) => {
//   const isActive = selectedCategory !== null

//   return (
//     <div className={styles.CategoriesList}>
//       <div className={`${styles.contentCard} card`}>
//         <div className={styles.list}>
//           {categories.map((cat, index) => {
//             const selectedCategoryID = selectedCategory?.id || ''
//             const isSelected = selectedCategoryID === cat.id

//             return (
//               <div
//                 className={`${styles.category} ${
//                   isActive ? styles.active : ''
//                 } ${isSelected ? styles.selected : ''}`}
//                 key={cat.id}
//               >
//                 <span className={styles.number}>{index + 1}.</span>
//                 {cat.name}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CategoriesList
