import styles from './Search.module.scss';

function Search({ setFilter }) {
	function handleInput(e) {
		const filter = e.target.value;
		setFilter(filter.trim().toLowerCase());
	}
	return (
		<div className={`${styles.searchBar} d-flex flex-row align-items my-30`}>
			<i className='fa-solid fa-magnifying-glass mr-15'></i>
			<input
				onInput={handleInput}
				className='flex-fill'
				type='text'
				placeholder='Rechercher'
			/>
		</div>
	);
}

export default Search;
