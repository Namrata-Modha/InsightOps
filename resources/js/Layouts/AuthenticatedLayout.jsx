import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function AuthenticatedLayout({ children }) {
    const { user } = usePage().props.auth;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm">
                <div className="p-6 font-bold text-lg text-indigo-700">
                    InsightOps
                </div>
                <nav className="px-4 space-y-3">
                    <Link href="/dashboard" className="block text-gray-700 hover:text-indigo-600">
                        📊 Dashboard
                    </Link>

                    {user.role === 'admin' && (
                        <>
                            <Link href="/incidents" className="block text-gray-700 hover:text-indigo-600">
                                🛠 Incidents
                            </Link>
                            <Link href="/config-logs" className="block text-gray-700 hover:text-indigo-600">
                                ⚙️ Config Logs
                            </Link>
                            <Link href="/audit-trail" className="block text-gray-700 hover:text-indigo-600">
                                📜 Audit Trail
                            </Link>
                        </>
                    )}

                    {user.role === 'analyst' && (
                        <>
                            <Link href="/report-incident" className="block text-gray-700 hover:text-indigo-600">
                                📝 Report Incident
                            </Link>
                            <Link href="/view-logs" className="block text-gray-700 hover:text-indigo-600">
                                📁 View Logs
                            </Link>
                        </>
                    )}

                    <Link href="/documents" className="block text-gray-700 hover:text-indigo-600">
                        📂 Documents
                    </Link>
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
