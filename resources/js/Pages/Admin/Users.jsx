import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Users({ auth, users }) {
    const deleteUser = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Users" />
            <div className="max-w-6xl mx-auto py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">👥 Users</h1>
                    <Link href={route('admin.users.create')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        ➕ Add User
                    </Link>
                </div>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map(user => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.id}</td>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2 space-x-2">
                                    <Link href={route('admin.users.edit', user.id)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</Link>
                                    <button onClick={() => deleteUser(user.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex gap-2">
                    {users.links.map((link, i) => (
                        <button key={i} disabled={!link.url} onClick={() => router.visit(link.url)} className="px-3 py-1 border rounded" dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
