import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'));
    };

    return (
        <div className={`container card shadow-sm p-4 ${className}`} style={{ borderRadius: '16px' }}>
            <h5 className="fw-bold mb-3 text-warning">
                <i className="bi bi-lock-fill me-2"></i> Update Password
            </h5>
            <p className="text-muted small">Make sure your new password is strong and secure.</p>

            <form onSubmit={submit}>
                <div className="form-group mb-3">
                    <label htmlFor="current_password" className="form-label">Current Password</label>
                    <input
                        type="password"
                        id="current_password"
                        className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                    />
                    {errors.current_password && <div className="invalid-feedback">{errors.current_password}</div>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                </div>

                <button
                    type="submit"
                    className="btn btn-dark rounded-pill px-4"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update Password'}
                </button>

                {recentlySuccessful && (
                    <div className="alert alert-success mt-3 mb-0">Password updated successfully!</div>
                )}
            </form>

        </div>
    );
}
