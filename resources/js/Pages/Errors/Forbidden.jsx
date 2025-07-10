import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Forbidden() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-red-600">403 – Forbidden</h1>
                <p className="mt-2 text-gray-700">
                    You do not have permission to view this page.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
