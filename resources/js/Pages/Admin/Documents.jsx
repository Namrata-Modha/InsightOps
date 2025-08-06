import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Documents({ auth, documents, filters }) {
    const deleteDoc = (id) => {
        if (confirm('Delete this document?')) {
            router.delete(route('admin.documents.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Documents" />

            <div className="max-w-6xl mx-auto py-6">
                {/* Export + Title */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Documents</h2>
                    <a
                        href={route('admin.documents.export', {
                            search: filters.search,
                            from: filters.from,
                            to: filters.to
                        })}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        ⬇️ Export CSV
                    </a>
                </div>

                {/* Filter Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const params = {
                            search: e.target.search.value,
                            from: e.target.from.value,
                            to: e.target.to.value,
                            page: 1 // Reset to first page
                        };
                        router.get(route('admin.documents'), params, { preserveScroll: true });
                    }}
                    className="mb-6 flex flex-wrap gap-4 items-end"
                >
                    <div>
                        <label className="block text-sm font-medium">Search</label>
                        <input name="search" defaultValue={filters.search} className="border p-2 rounded w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">From</label>
                        <input type="date" name="from" defaultValue={filters.from} className="border p-2 rounded w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">To</label>
                        <input type="date" name="to" defaultValue={filters.to} className="border p-2 rounded w-full" />
                    </div>
                    <div>
                        <button type="submit" className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Filter
                        </button>
                    </div>
                </form>

                {/* Documents Table */}
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">File Path</th>
                            <th className="border p-2">Uploaded By</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.data.map(doc => (
                            <tr key={doc.id}>
                                <td className="border p-2">{doc.title}</td>
                                <td className="border p-2">
                                    <a
                                        href={doc.file_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {doc.file_path}
                                    </a>
                                </td>
                                <td className="border p-2">{doc.uploaded_by}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => deleteDoc(doc.id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex gap-2">
                    {documents.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() =>
                                router.get(route('admin.documents'), {
                                    search: filters.search,
                                    from: filters.from,
                                    to: filters.to,
                                    page: new URL(link.url).searchParams.get('page')
                                }, { preserveScroll: true })
                            }
                            className={`px-3 py-1 border rounded ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
