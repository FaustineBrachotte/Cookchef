import styles from './Content.module.scss'
import Recipe from './Recipe'
import { data } from '../data/recipes'
import { useState } from 'react';

function Content() {
  const recipes = data;
  const [filter, setFilter] = useState('');

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

    return (
      <div className="flex-fill container p-20">
        <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
        <div className={`${styles.contentCard} card p-20`}>
            <div className={`${styles.searchBar} d-flex flex-row align-items my-30`}> 
              <i className="fa-solid fa-magnifying-glass mr-15"></i>
              <input onInput={ handleInput} className="flex-fill" type="text" placeholder='Rechercher' />
            </div>
            <div className={styles.grid}>
                { recipes.filter( r => r.title.toLowerCase().startsWith(filter)).map( r => <Recipe title={r.title} image={r.image} key={r.title} />)}
            </div>
        </div>
      </div>
    )
  }
  
  export default Content