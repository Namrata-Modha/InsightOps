import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Logs({ auth, accessLogs, auditLogs, filters }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="System Logs" />
            <div className="max-w-7xl mx-auto py-6 space-y-8">

                {/* Access Logs */}
                <div className="bg-white p-6 rounded shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Access Logs</h2>
                        <a
                            href={route('admin.logs.export', {
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
                                page: 1 // Reset to first page on filter change
                            };
                            router.get(route('admin.logs'), params, { preserveScroll: true });
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
                            <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Filter
                            </button>
                        </div>
                    </form>

                    {/* Access Logs Table */}
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">User</th>
                                <th className="border p-2">IP</th>
                                <th className="border p-2">Login</th>
                                <th className="border p-2">Logout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accessLogs.data.map(log => (
                                <tr key={log.id}>
                                    <td className="border p-2">{log.user_id}</td>
                                    <td className="border p-2">{log.ip_address}</td>
                                    <td className="border p-2">{log.login_at}</td>
                                    <td className="border p-2">{log.logout_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex gap-2">
                        {accessLogs.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() =>
                                    router.get(route('admin.logs'), {
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

                {/* Audit Trails */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Audit Trails</h2>
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">User</th>
                                <th className="border p-2">Module</th>
                                <th className="border p-2">Action</th>
                                <th className="border p-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditLogs.data.map(log => (
                                <tr key={log.id}>
                                    <td className="border p-2">{log.user_id}</td>
                                    <td className="border p-2">{log.module}</td>
                                    <td className="border p-2">{log.action}</td>
                                    <td className="border p-2">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex gap-2">
                        {auditLogs.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() =>
                                    router.get(route('admin.logs'), {
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
            </div>
        </AuthenticatedLayout>
    );
}
