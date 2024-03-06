import styles from './RecipeForm.module.scss';
import * as yup from 'yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiContext } from '../../../../../context/ApiContext';

function RecipeForm() {
	const BASE_URL_API = useContext(ApiContext);

	const defaultValues = {
		title: '',
		image: '',
	};

	const recipeSchema = yup.object({
		title: yup
			.string()
			.required('Le champ est requis')
			.min(10, 'Le titre doit être explicite')
			.max(30, 'Le titre doit être succint'),
		image: yup
			.string()
			.url("Le lien de l'image n'est pas valide")
			.required('Le champ est requis'),
	});

	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
	} = useForm({ defaultValues, resolver: yupResolver(recipeSchema) });

	async function submit(values) {
		try {
			clearErrors();
			const response = await fetch(BASE_URL_API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (response.ok) {
				reset(defaultValues);
				alert('La recette a bien été ajoutée !');
			} else {
				setError('generic', {
					type: 'generic',
					message: 'Il y a eu une erreur',
				});
			}
		} catch (error) {
			setError('generic', {
				type: 'generic',
				message: 'Il y a eu une erreur',
			});
		}
	}

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={`${styles.recipeForm} d-flex flex-column card p-20`}
		>
			<h2 className='mb-20'>Ajouter une recette</h2>
			<div className='d-flex flex-column mb-20'>
				<label>Titre de la recette</label>
				<input {...register('title')} type='text' />
				{errors.title && (
					<p className='form-error'>{errors.title.message}</p>
				)}
			</div>
			<div className='d-flex flex-column mb-20'>
				<label>Image</label>
				<input {...register('image')} type='text' />
				{errors.image && (
					<p className='form-error'>{errors.image.message}</p>
				)}
			</div>
			{errors.generic && (
				<p className='form-error'>{errors.generic.message}</p>
			)}

			<div>
				<button disabled={isSubmitting} className='btn btn-primary'>
					Sauvegarder
				</button>
			</div>
		</form>
	);
}

export default RecipeForm;
