import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, setErrors, reset } = useForm({
        name: '',
        email: '',
        role: 'analyst',
        password: '',
        password_confirmation: '',
    });

    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) errors.name = 'Name is required';
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else {
            if (data.password.length < 8) {
                errors.password = 'Password must be at least 8 characters';
            }
            if (!/[a-z]/.test(data.password)) {
                errors.password = 'Must include at least one lowercase letter';
            }
            if (!/[A-Z]/.test(data.password)) {
                errors.password = 'Must include at least one uppercase letter';
            }
            if (!/[0-9]/.test(data.password)) {
                errors.password = 'Must include at least one number';
            }
            if (!/[!@#$%^&*]/.test(data.password)) {
                errors.password = 'Must include one special character (!@#$%^&*)';
            }
        }

        if (data.password !== data.password_confirmation) {
            errors.password_confirmation = 'Passwords do not match';
        }

        return errors;
    };

    const submit = (e) => {
        e.preventDefault();
        const clientErrors = validateForm(data);

        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            return;
        }

        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Create an InsightOps Account</h1>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="analyst">Analyst</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-600 text-sm mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
// This component handles user registration with form validation and error handling.
// It includes fields for name, email, role selection, and password with confirmation.
// The form validates input and displays appropriate error messages for each field.
// The role can be either 'analyst' or 'admin', with different permissions in the application.
// The form submission is handled using Inertia.js, posting the data to the server for processing