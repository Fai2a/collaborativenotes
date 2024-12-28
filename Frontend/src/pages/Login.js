import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(); // Initialize Firebase Auth

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use Firebase Auth to log in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            alert('Login successful');
            console.log('User Info:', user);

            // Redirect to dashboard or home page after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="md:w-1/2 p-4">
                    <img
                        src="./assets/depositphotos.jpg"
                        alt="Login"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                {/* Right side - Login Form */}
                <div className="md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
