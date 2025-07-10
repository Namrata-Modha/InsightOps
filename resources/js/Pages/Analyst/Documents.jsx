import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Documents({ auth, documents, filters }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        router.get(route('analyst.documents'), { search: query }, { preserveScroll: true });
    };

    const renderPagination = (links) =>
        <div className="mt-4 flex gap-2">{links.map((link, i) => (
            <button key={i} disabled={!link.url} onClick={() => router.get(link.url)} className="px-3 py-1 border rounded text-sm">
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </button>
        ))}</div>;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Documents" />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    router.post(route('analyst.documents.upload'), formData, {
                        forceFormData: true,
                    });
                }}
                className="mb-6 space-y-4 bg-gray-50 p-4 rounded border"
            >
                <h3 className="text-lg font-semibold">📤 Upload New Document</h3>

                <input name="title" type="text" required placeholder="Document Title" className="block w-full p-2 border rounded" />
                <input name="file" type="file" required className="block w-full p-2 border rounded" />

                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Upload</button>
            </form>
            <a href={route('analyst.documents.export')} className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                ⬇️ Export Documents CSV
            </a>

            <div className="max-w-5xl mx-auto py-10">
                <form onSubmit={handleSearch} className="mb-6">
                    <input name="search" defaultValue={filters.search} className="border p-2 mr-2 rounded" placeholder="Search documents..." />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Search</button>
                </form>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Shared Documents</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        {documents.data.map((doc) => (
                            <li key={doc.id}>
                                <a href={doc.file_path} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                    {doc.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {renderPagination(documents.links)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
