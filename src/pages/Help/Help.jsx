// src/pages/Help.jsx
import { Link } from 'react-router-dom';
import './Help.scss';

const Help = () => {
    return (
        <div className="help-page">
            <div className="help-container">
                {/* Header */}
                <header className="help-header">
                    <h1>Help & Support</h1>
                    <p>GMF AeroAsia Customer Service</p>
                </header>

                {/* Main Content */}
                <main className="help-content">
                    {/* Contact Section */}
                    <section className="help-section">
                        <h2>📞 Contact Information</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <strong>Phone:</strong> +62-21-550-5555
                            </div>
                            <div className="contact-item">
                                <strong>Email:</strong> support@gmf-aeroasia.com
                            </div>
                            <div className="contact-item">
                                <strong>Operating Hours:</strong> 24/7 Available
                            </div>
                            <div className="contact-item">
                                <strong>Location:</strong> Soekarno-Hatta Airport
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="help-section">
                        <h2>❓ Frequently Asked Questions</h2>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h3>How to generate QR reports?</h3>
                                <p>Click the "Report" button on the home page and follow the instructions to generate your QR code.</p>
                            </div>
                            <div className="faq-item">
                                <h3>What if I have an emergency?</h3>
                                <p>Call our emergency hotline at +62-21-550-5555. We're available 24/7 for urgent matters.</p>
                            </div>
                            <div className="faq-item">
                                <h3>How to contact customer service?</h3>
                                <p>You can reach us via phone, email, or visit our office at Soekarno-Hatta Airport.</p>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section className="help-section">
                        <h2>🚀 Quick Actions</h2>
                        <div className="quick-actions">
                            <Link to="/" className="action-link">
                                🏠 Back to Home
                            </Link>
                            <a href="tel:+62-21-550-5555" className="action-link">
                                📞 Call Support
                            </a>
                            <a href="mailto:support@gmf-aeroasia.com" className="action-link">
                                ✉️ Send Email
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Help;