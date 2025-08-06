import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditIncident({ auth, incident }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: incident.title || '',
        description: incident.description || ''
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('analyst.incidents.update', incident.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Incident" />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Edit Incident</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.title && <p className="text-red-600">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.description && <p className="text-red-600">{errors.description}</p>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
