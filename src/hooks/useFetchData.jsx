import { useState, useEffect } from 'react';

export function useFetchData(url, page) {
	const [data, setData] = useState([]);
	const [moreData, setMoreData] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [error, setError] = useState([]);

	useEffect(() => {
		let cancel = false;
		async function getData() {
			try {
				setisLoading(true);
				let queries = '';

				if (page) {
					queries += `?skip=${(page - 1) * 6}&limit=6&sort=createdAt:-1`;
				}
				const response = await fetch(url + queries);
				if (response.ok && !cancel) {
					const newData = await response.json();
					if (Array.isArray(newData) && newData.length > 0) {
						setData((x) => [...x, ...newData]);
					} else {
						setMoreData(false);
					}
				}
			} catch (error) {
				console.error("Une erreur s'est produite :", error);
				setError('Erreur');
			} finally {
				if (!cancel) {
					setisLoading(false);
				}
			}
		}
		getData();
		return () => (cancel = true);
	}, [url, page]);

	return [[data, setData], [moreData, setMoreData], isLoading, error];
}
