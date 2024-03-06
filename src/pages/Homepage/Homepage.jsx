import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import { useState, useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';
import Search from './components/Search/Search';
import { useFetchData } from '../../hooks/useFetchData';

function Homepage() {
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState('');
	const BASE_URL_API = useContext(ApiContext);

	const [[recipes, setRecipes], [hasMoreRecipes], isLoading] = useFetchData(
		BASE_URL_API,
		page
	);

	function updateRecipe(updatedRecipe) {
		setRecipes(
			recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
		);
	}

	return (
		<div className='flex-fill container d-flex flex-column p-20'>
			<h1 className='my-30'>Découvrez nos nouvelles recettes</h1>
			<div
				className={`${styles.contentCard} card d-flex flex-column flex-fill p-20 mb-20`}
			>
				<Search filter={filter} setFilter={setFilter} />
				{isLoading && !recipes.length ? (
					<Loader />
				) : (
					<div className={styles.grid}>
						{recipes
							.filter((r) => r.title.toLowerCase().startsWith(filter))
							.map((r) => (
								<Recipe
									key={r._id}
									recipe={r}
									toggleLikedRecipe={updateRecipe}
								/>
							))}
					</div>
				)}
				<div className='d-flex flex-row justify-content align-items p-30'>
					<button
						onClick={() => {
							if (hasMoreRecipes) {
								setPage(page + 1);
							}
						}}
						className={`btn ${
							hasMoreRecipes ? 'btn-primary' : 'btn-disabled'
						}`}
						disabled={!hasMoreRecipes}
					>
						Charger plus de recettes
					</button>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
