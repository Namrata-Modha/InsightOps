import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className={`container card shadow-sm mb-4 p-4 ${className}`} style={{ borderRadius: '16px' }}>
            <h5 className="fw-bold mb-3 text-primary">
                <i className="bi bi-person-circle me-2"></i> Profile Information
            </h5>
            <p className="text-muted small">Update your name and email address.</p>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <button type="submit" className="btn btn-dark rounded-pill px-4" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </button>

                {recentlySuccessful && (
                    <div className="alert alert-success mt-3 mb-0">Profile updated successfully!</div>
                )}
            </form>
        </div>
    );
}
   