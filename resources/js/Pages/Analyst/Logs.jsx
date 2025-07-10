import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Logs({ auth, accessLogs, auditLogs, filters }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        router.get(route('analyst.logs'), { search: query }, { preserveScroll: true });
    };

    const renderPagination = (links) =>
        <div className="mt-4 flex gap-2">{links.map((link, i) => (
            <button key={i} disabled={!link.url} onClick={() => router.get(link.url)} className="px-3 py-1 border rounded text-sm">
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </button>
        ))}</div>;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="User Logs" />

            <div className="max-w-7xl mx-auto py-10 space-y-8">
                <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-4 items-end">
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
                        <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Filter
                        </button>
                    </div>
                </form>
                <a href={route('analyst.logs.export')} className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    ⬇️ Export Access Logs CSV
                </a>

            
                <div className="bg-white p-6 shadow rounded">
                    <h2 className="font-bold text-xl mb-2">Access Logs</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {accessLogs.data.map((log) => (
                            <li key={log.id}>{log.ip_address} — {log.login_at}</li>
                        ))}
                    </ul>
                    {renderPagination(accessLogs.links)}
                </div>

                <div className="bg-white p-6 shadow rounded">
                    <h2 className="font-bold text-xl mb-2">Audit Trails</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {auditLogs.data.map((log) => (
                            <li key={log.id}>{log.module} | {log.action} | {log.details}</li>
                        ))}
                    </ul>
                    {renderPagination(auditLogs.links)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
