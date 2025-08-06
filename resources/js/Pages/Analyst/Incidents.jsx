import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';


export default function Incidents({ auth, incidents }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Incidents" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">My Reported Incidents</h1>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.data.map(incident => (
                            <tr key={incident.id}>
                                <td className="border p-2">{incident.title}</td>
                                <td className="border p-2">{incident.description}</td>
                                <td className="border p-2">{incident.status}</td>
                                <td className="border p-2">{incident.created_at}</td>
                                <td className="border p-2 flex gap-2">
                                    <a
                                        href={route('analyst.incidents.edit', incident.id)}
                                        className="bg-blue-600 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this incident?')) {
                                                router.delete(route('analyst.incidents.destroy', incident.id));
                                            }
                                        }}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
