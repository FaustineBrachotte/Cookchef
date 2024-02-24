import styles from './Recipe.module.scss'
import recipe from '../assets/images/recette.jpg'

function Recipe() {
    return (
      <div className={styles.recipe}>
        <div className={styles.imageContainer}>
            <img src={recipe} alt="Recette"/>
        </div>
        <div className={` ${styles.recipeTitle} d-flex flex-row justify-content align-items`}>
            <h3>Spaghettis à la bolognaise</h3>
        </div>
        
      </div>
    )
  }
  
  export default Recipe