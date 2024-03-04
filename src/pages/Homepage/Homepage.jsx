import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';

function Homepage() {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
	const BASE_URL_API = useContext(ApiContext);

	useEffect(() => {
		let cancel = false;
		async function getRecipes() {
			try {
				setisLoading(true);
				const response = await fetch(
					`${BASE_URL_API}?skip=${(page - 1) * 6}&limit=6`
				);
				if (response.ok && !cancel) {
					const newRecipes = await response.json();
					if (Array.isArray(newRecipes) && newRecipes.length > 0) {
						setRecipes((x) => [...x, ...newRecipes]);
					} else {
						setHasMoreRecipes(false);
					}
				}
			} catch (error) {
				console.error("Une erreur s'est produite :", error);
			} finally {
				if (!cancel) {
					setisLoading(false);
				}
			}
		}
		getRecipes();
		return () => (cancel = true);
	}, [BASE_URL_API, page]);

	function handleInput(e) {
		const filter = e.target.value;
		setFilter(filter.trim().toLowerCase());
	}

	function updateRecipe(updatedRecipe) {
		setRecipes(
			recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
		);
	}

	return (
		<div className='flex-fill container d-flex flex-column p-20'>
			<h1 className='my-30'>
				Découvrez nos nouvelles recettes <small>{recipes.length}</small>
			</h1>
			<div
				className={`${styles.contentCard} card d-flex flex-column flex-fill p-20 mb-20`}
			>
				<div
					className={`${styles.searchBar} d-flex flex-row align-items my-30`}
				>
					<i className='fa-solid fa-magnifying-glass mr-15'></i>
					<input
						onInput={handleInput}
						className='flex-fill'
						type='text'
						placeholder='Rechercher'
					/>
				</div>
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
