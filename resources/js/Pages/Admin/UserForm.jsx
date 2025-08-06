import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function UserForm({ auth, user }) {
    const { data, setData, post, patch, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            patch(route('admin.users.update', user.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={user ? 'Edit User' : 'Add User'} />
            <div className="max-w-lg mx-auto py-6">
                <h1 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="border rounded p-2 w-full" />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="border rounded p-2 w-full" />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block mb-1">Role</label>
                        <select value={data.role} onChange={e => setData('role', e.target.value)} className="border rounded p-2 w-full">
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="analyst">Analyst</option>
                        </select>
                        {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-4 py-2 rounded">
                        {user ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
