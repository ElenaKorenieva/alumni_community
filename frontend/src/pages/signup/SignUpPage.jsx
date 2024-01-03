import React, { useState } from 'react';
import './SignUpPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [github, setGithub] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSignUp = () => {
        // backend
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('GitHub:', github);
        console.log('Password:', password);
        console.log('Repeat Password:', repeatPassword);
    };

    return (
        <div className="signup-container">
            <div className="left-column">
                <img src="/images/signup-img.jpg" alt="Logo" className="left-image" />
            </div>
            <div className="right-column">
                <h1 className='text-center'>ALUMNI COMMUNITY</h1>
                <img src="/images/logo-b.png" alt="Matrix Master logo" className='image-logo w-50 mx-auto d-block' />
                <h2 className='text-center'>Welcome to the <br /> Matrix Master Alumni Community!</h2>
                <h3>Sign Up for the Community:</h3>
                <form >
                    <div className="form-group mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name:</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email Address:</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="github" className="form-label">GitHub:</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="github"
                            placeholder="Enter your GitHub link"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control custom-input"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="repeatPassword" className="form-label">Repeat Password:</label>
                        <input
                            type="password"
                            className="form-control custom-input"
                            id="repeatPassword"
                            placeholder="Repeat your password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" className='w-100' onClick={handleSignUp}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;