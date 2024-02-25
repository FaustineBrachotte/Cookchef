import styles from './Content.module.scss'
import Recipe from './Recipe'
import { data } from '../data/recipes'

function Content() {
  const recipes = data;

    return (
      <div className="flex-fill container p-20">
        <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
        <div className={`${styles.contentCard} card p-20`}>
            <div className={styles.grid}>
                { recipes.map( r => <Recipe title={r.title} image={r.image} key={r.title} />)}
            </div>
        </div>
      </div>
    )
  }
  
  export default Content