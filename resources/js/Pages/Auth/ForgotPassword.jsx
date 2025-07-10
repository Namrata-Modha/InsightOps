import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, setErrors } = useForm({
        email: '',
    });

    const validateForm = (data) => {
        const errors = {};

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Invalid email format';
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

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Forgot your password?</h1>
                    <p className="text-sm text-gray-600 text-center mb-4">
                        No worries. Enter your email and we’ll send you a reset link.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm text-green-600 font-medium text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
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
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Send Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
// This component handles the "Forgot Password" functionality, allowing users to request a password reset link.
// It includes form validation for the email field and displays appropriate error messages.
// The form submission is handled using Inertia.js, posting the data to the server for processing.
// The component also displays a success message if the email is sent successfully.
// The layout is styled with Tailwind CSS for a clean and modern look.
// The form includes a heading, instructions, and a button to submit the request.
// The email input field is validated to ensure it is not empty and follows a valid email format.
// If the email is successfully sent, a status message is displayed to inform the user.
// The component is designed to be user-friendly and responsive, adapting to different screen sizes.
// The layout uses a centered card design with a white background and rounded corners for a polished appearance