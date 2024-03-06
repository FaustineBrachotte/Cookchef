import styles from './RecipeForm.module.scss';

function RecipeForm() {
	return (
		<form className={`${styles.recipeForm} d-flex flex-column card p-20`}>
			<h2 className='mb-20'>Ajouter une recette</h2>
			<div className='d-flex flex-column mb-20'>
				<label>Titre de la recette</label>
				<input type='text' />
				{/* <p className='form-error'>Erreur</p> */}
			</div>
			<div className='d-flex flex-column mb-20'>
				<label>Image</label>
				<input type='text' />
				{/* <p className='form-error'>Erreur</p> */}
			</div>
			<div>
				<button className='btn btn-primary'>Sauvegarder</button>
			</div>
		</form>
	);
}

export default RecipeForm;
