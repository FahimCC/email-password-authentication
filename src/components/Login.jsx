import {
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.config';

const Login = () => {
	const [error, setError] = useState('');
	const [togglePassword, setTogglePassword] = useState(false);
	const emailRef = useRef();
	const auth = getAuth(app);

	const handleLogin = event => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signInWithEmailAndPassword(auth, email, password)
			.then(result => {
				const loggedUser = result.user;
				form.reset();
				setError('');
				if (loggedUser.emailVerified) {
					toast.success('Login Successfully');
					return;
				} else {
					toast('Please verify your email', {
						icon: '❗❗',
					});
				}
			})
			.catch(error => {
				setError(error.message);
				console.log(error.message);
			});
	};

	const handleResetPassword = event => {
		const email = emailRef.current.value;
		if (!email) {
			toast.error('Please provide your email address to reset password.');
			return;
		}

		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast('Please check your email', {
					icon: '💬',
				});
			})
			.catch(error => {
				console.log(error.message);
				setError(error.message);
				toast.error(error.message);
			});
	};

	return (
		<div>
			<form onSubmit={handleLogin} className='flex flex-col space-y-4'>
				<h3>Please Login....</h3>
				<input
					type='email'
					name='email'
					ref={emailRef}
					placeholder='Email'
					className='py-3 px-4 rounded-lg'
					required
				/>
				<input
					type={`${togglePassword ? 'text' : 'password'}`}
					name='password'
					placeholder='Password'
					className='py-3 px-4 rounded-lg'
					required
				/>
				<span className='inline relative'>
					{togglePassword ? (
						<svg
							onClick={() => setTogglePassword(!togglePassword)}
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 absolute right-2 -top-[52px]'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
							/>
						</svg>
					) : (
						<svg
							onClick={() => setTogglePassword(!togglePassword)}
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 absolute right-2 -top-[52px]'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
					)}
				</span>
				<p>
					Forgot password?{' '}
					<Link>
						<span onClick={handleResetPassword}>Reset password</span>
					</Link>
				</p>
				<button>
					<input type='submit' value='Login' />
				</button>
				<p className='text-red-600'>{error}</p>
			</form>
			<p className='my-4'>
				New to this website? Please <Link to='/register'>register</Link>
			</p>
		</div>
	);
};

export default Login;
