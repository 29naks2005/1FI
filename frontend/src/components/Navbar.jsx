import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, User, Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const categories = [
        'Mobiles', 'Electronics', 'TV, AC & Appliances', 'Kitchen & Home',
        'Health & Wellness', 'Fashion', 'Baby & Kids', 'Sports & Fitness'
    ];

    return (
        <header className="navbar">
            <div className="top-bar">
                <div className="top-bar-inner container">
                    <Link to="/" className="brand">
                        <span className="brand-name">1</span>
                        <span className="brand-accent">FI</span>
                    </Link>



                    <div className="nav-actions">
                        <a href="#" className="nav-link">
                            <CreditCard size={18} />
                            <span>Pay EMI</span>
                        </a>
                        <a href="#" className="signup-btn">
                            <User size={18} />
                            <span>Sign-up</span>
                        </a>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <nav className={`category-bar ${menuOpen ? 'open' : ''}`}>
                <div className="category-bar-inner container">
                    <button className="menu-icon">
                        <Menu size={20} />
                    </button>
                    <ul className="category-list">
                        {categories.map(cat => {
                            const slug = cat.toLowerCase().replace(/&/g, '').replace(/,/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
                            return (
                                <li key={cat}>
                                    <Link to={`/category/${slug}`} className="category-link">{cat}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
