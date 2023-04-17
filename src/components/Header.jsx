import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className='space-x-6'>
			<Link to='/'>Home</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
		</nav>
	);
};

export default Header;
