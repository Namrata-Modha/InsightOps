import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'analyst',
        password: '',
        password_confirmation: '',
    });

    // Separate state for client-side validation errors
    const [clientErrors, setClientErrors] = React.useState({});

    const validateForm = (data) => {
        const errs = {};

        if (!data.name.trim()) errs.name = 'Name is required';
        if (!data.email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errs.email = 'Invalid email format';
        }

        if (!data.password) {
            errs.password = 'Password is required';
        } else {
            if (data.password.length < 8) {
                errs.password = 'Password must be at least 8 characters';
            }
            if (!/[a-z]/.test(data.password)) {
                errs.password = 'Must include at least one lowercase letter';
            }
            if (!/[A-Z]/.test(data.password)) {
                errs.password = 'Must include at least one uppercase letter';
            }
            if (!/[0-9]/.test(data.password)) {
                errs.password = 'Must include at least one number';
            }
            if (!/[!@#$%^&*]/.test(data.password)) {
                errs.password = 'Must include one special character (!@#$%^&*)';
            }
        }

        if (data.password !== data.password_confirmation) {
            errs.password_confirmation = 'Passwords do not match';
        }

        return errs;
    };

    const submit = (e) => {
        e.preventDefault();
        const foundErrors = validateForm(data);

        if (Object.keys(foundErrors).length > 0) {
            setClientErrors(foundErrors); // ✅ set client errors
            return;
        }

        setClientErrors({}); // clear client errors before submit
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
                        Create an InsightOps Account
                    </h1>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {(clientErrors.name || errors.name) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {clientErrors.name || errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {(clientErrors.email || errors.email) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {clientErrors.email || errors.email}
                                </p>
                            )}
                        </div>

                        {/* Role */}
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
                            {(clientErrors.role || errors.role) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {clientErrors.role || errors.role}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {(clientErrors.password || errors.password) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {clientErrors.password || errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            {(clientErrors.password_confirmation || errors.password_confirmation) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {clientErrors.password_confirmation || errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
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
