import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return (
        <div className="container mt-5">
            <h1>Hello from React 🚀</h1>
            <p>This is your InsightOps dashboard!</p>
        </div>
    );
}

const root = document.getElementById('react-root');

if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
// If you want to use this file, make sure to include it in your Laravel Blade template:
// <script type="module" src="{{ mix('js/app.jsx') }}"></script>