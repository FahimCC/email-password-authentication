import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

const App = () => {
	return (
		<div>
			<Header />
			<div className='py-5'></div>
			<Outlet />
			<Toaster />
		</div>
	);
};

export default App;
