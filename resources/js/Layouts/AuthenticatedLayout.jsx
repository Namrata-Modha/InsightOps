import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function AuthenticatedLayout({ children }) {
    const { user } = usePage().props.auth;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="px-6 py-4 font-bold text-xl border-b">InsightOps</div>
                <nav className="flex flex-col gap-2 p-4 text-gray-700">
                    {/* Analyst Menu */}
                    {user.role === 'analyst' && (
                    <>
                        <Link href={route('analyst.dashboard')}>🏠 Dashboard</Link>
                        <Link href={route('analyst.incidents.create')}>🚨 Report Incident</Link>
                        <Link href={route('analyst.incidents.index')}>📋 My Incidents</Link>
                        <Link href={route('analyst.logs')}>📜 View Logs</Link>
                        <Link href={route('analyst.kpis')}>📈 KPIs</Link>
                        <Link href={route('analyst.documents')}>📁 Documents</Link>
                    </>
                    )}

                    {/* Admin Menu */}
                    {user.role === 'admin' && (
                    <>
                        <Link href={route('admin.dashboard')}>🏠 Dashboard</Link>
                        <Link href={route('admin.users.index')}>👥 Manage Users</Link>
                        <Link href={route('admin.logs')}>📜 View Logs</Link>
                        <Link href={route('admin.documents')}>📁 Documents</Link>
                    </>
                    )}

                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 hover:text-indigo-600 transition ease-in-out"
                                    >
                                        {user.name}
                                        <svg
                                            className="ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
