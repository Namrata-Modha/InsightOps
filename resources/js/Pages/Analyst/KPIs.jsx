import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function KPIs({ auth, uptime, activeUsers, logCount, loginsOverTime }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="System KPIs" />

            <div className="py-12 max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center">
                    <div className="bg-indigo-600 p-6 rounded shadow">Uptime: <strong>{uptime}</strong></div>
                    <div className="bg-green-600 p-6 rounded shadow">Active Users: <strong>{activeUsers}</strong></div>
                    <div className="bg-yellow-500 p-6 rounded shadow">Total Logs: <strong>{logCount}</strong></div>
                </div>

                <div className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4">User Logins (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={loginsOverTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
