// src/pages/NotFound.jsx
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="notfound-page">
            <div className="notfound-container">
                <div className="notfound-content">
                    <h1 className="error-code">404</h1>
                    <div className="plane-icon">✈️</div>
                    <h2>Page Not Found</h2>
                    <p>The page you're looking for seems to have taken off!</p>

                    <div className="notfound-actions">
                        <Link to="/" className="btn btn-primary">
                            🏠 Go Home
                        </Link>
                        <button onClick={handleGoBack} className="btn btn-secondary">
                            ← Go Back
                        </button>
                        <Link to="/help" className="btn btn-outline">
                            ❓ Get Help
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;