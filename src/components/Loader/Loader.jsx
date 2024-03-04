import styles from './Loader.module.scss';

function Loader() {
	return (
		<div className='d-flex flex-row justify-content flex-fill align-items'>
			<i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
		</div>
	);
}

export default Loader;
