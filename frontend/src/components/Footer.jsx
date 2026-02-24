import './Footer.css';

function Footer() {
    return (
        <footer className="footer-minimal">
            <div className="footer-content container">
                <div className="footer-brand-section">
                    <a href="/" className="footer-brand">
                        <span className="brand-logo">1</span>
                        <span className="brand-accent">FI</span>
                    </a>
                    <p className="footer-desc">
                        Premium products. Unbeatable EMI plans.
                    </p>
                </div>

                <div className="footer-links">
                    <a href="#">Shop</a>
                    <a href="#">EMI Plans</a>
                    <a href="#">Support</a>
                    <a href="#">Contact Us</a>
                </div>

                <div className="footer-meta">
                    <p>© {new Date().getFullYear()} 1FI. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy</a>
                        <span className="dot">•</span>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
