import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalUsers, totalDocuments, totalLogs, uptime }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                <div className="bg-white p-4 rounded shadow">👥 Users: {totalUsers}</div>
                <div className="bg-white p-4 rounded shadow">📁 Documents: {totalDocuments}</div>
                <div className="bg-white p-4 rounded shadow">📜 Logs: {totalLogs}</div>
                <div className="bg-white p-4 rounded shadow">⏱ Uptime: {uptime}</div>
            </div>
        </AuthenticatedLayout>
    );
}
