import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.config';

const Register = () => {
	const [error, setError] = useState('');

	const auth = getAuth(app);

	const handleRegister = event => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		const name = event.target.name.value;
		console.log(email, password);

		if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
			setTimeout(() => {
				setError('Please add at least two uppercase');
				event.target.password.value = '';
			}, 4000);
			toast.error('Please add at least two uppercase');
			return;
		} else if (!/(?=.*[!@#$&*])/.test(password)) {
			setTimeout(() => {
				setError('Please add at least one special character');
				event.target.password.value = '';
			}, 4000);
			toast.error('Please add at least one special character');
			return;
		} else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
			setTimeout(() => {
				setError('Please add at least two digits');
				event.target.password.value = '';
			}, 4000);
			toast.error('Please add at least two digits');
			return;
		} else if (password.length < 6) {
			setTimeout(() => {
				setError('Please add at least 6 character in your password');
				event.target.password.value = '';
			}, 4000);
			toast.error('Please add at least 6 character in your password');
			return;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then(result => {
				const loggedUser = result.user;
				console.log(loggedUser);
				setError('');
				toast.success('Register Successfully');
				event.target.reset();
				handleEmailVerification(loggedUser);

				updateProfile(loggedUser, {
					displayName: name,
				});
			})
			.catch(error => {
				console.log(error.message);
				toast.error(error.message);
				setTimeout(() => {
					setError(error.message);
				}, 4000);
			});
	};

	const handleEmailVerification = loggedUser => {
		sendEmailVerification(loggedUser)
			.then(result => {
				toast('Please check your email', {
					icon: '💬',
				});
			})
			.catch(error => {
				console.log(error.message);
			});
	};

	return (
		<div>
			<form onSubmit={handleRegister} className='flex flex-col space-y-4'>
				<h3>Please Register ....</h3>
				<input
					type='email'
					name='email'
					placeholder='Email'
					className='py-3 px-4 rounded-lg'
					required
				/>
				<input
					type='name'
					name='name'
					placeholder='User name'
					className='py-3 px-4 rounded-lg'
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					className='py-3 px-4 rounded-lg'
					required
				/>
				<button>
					<input type='submit' value='Register' />
				</button>
				<p className='text-red-600'>{error}</p>
			</form>
			<p className='my-4'>
				Already have an account? Please <Link to='/login'>login</Link>
			</p>
		</div>
	);
};

export default Register;
