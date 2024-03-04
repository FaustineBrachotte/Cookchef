import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/index.scss';
import { ApiContext } from './context/ApiContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApiContext.Provider value='https://restapi.fr/api/f-recipes'>
			<App />
		</ApiContext.Provider>
	</React.StrictMode>
);
