import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


export default function AnalystDashboard({ auth, user, recentActivity, activityChart }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Analyst Dashboard" />
            <div className="py-12 space-y-6 max-w-7xl mx-auto sm:px-6 lg:px-8">

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href={route('analyst.logs')} className="p-4 bg-blue-100 rounded hover:bg-blue-200">📜 View Logs</Link>
                    <Link href={route('analyst.kpis')} className="p-4 bg-green-100 rounded hover:bg-green-200">📈 KPIs</Link>
                    <Link href={route('analyst.documents')} className="p-4 bg-yellow-100 rounded hover:bg-yellow-200">📁 Documents</Link>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    router.patch(route('analyst.profile.update'), formData);
                }} className="mb-6 bg-gray-100 p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">✏️ Update Your Name</h3>
                    <input name="name" defaultValue={user.name} className="p-2 border rounded mr-2" />
                    <button className="bg-indigo-600 text-white px-3 py-2 rounded">Update</button>
                </form>
                {/* Profile Summary */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">👤 Analyst Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">🕒 Recent Activity</h2>
                    {recentActivity.length ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {recentActivity.map((log) => (
                                <li key={log.id}>
                                    <span className="font-medium">{log.module}</span> — {log.action} <br />
                                    <span className="text-sm text-gray-500">{log.details}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No recent activity found.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">📊 Your Weekly Activity</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={activityChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
