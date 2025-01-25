import React, { useState } from 'react';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    let formErrors = {};
    if (!user.trim()) {
      formErrors.user = 'Name is required';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }
    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission
    const formErrors = validate();
    console.log('Validation errors:', formErrors); // Debug log
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: user, password })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Login successful');
        } else {
          alert(data.error || 'Login failed. Please try again.'); // Show error message
        }
      } catch (error) {
        alert('Server error, please try again later');
      }
    } else {
      setErrors(formErrors); // Set errors state if validation fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col gap-6 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="user" className="text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
