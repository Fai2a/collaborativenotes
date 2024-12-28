import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { auth, db } from '../firebase/firebaseconfig'; // Import Firebase authentication and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth function
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions
import { Link } from 'react-router-dom'; // Import Link for routing

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Now store the user data (username and email) in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email
            });

            // Successfully registered, redirect to login page
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            console.error("Error registering user: ", error.message);
            alert('Registration failed. ' + error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="md:w-1/2 p-4">
                    <img
                        src="./assets/depositphotos.jpg"
                        alt="Notes"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                {/* Right side - Registration Form */}
                <div className="md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Register
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-4 text-center text-gray-600">
                        Have an account? 
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
