import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

function CategoryPage() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const isMobileCategory = categoryName?.toLowerCase() === 'mobiles';

    useEffect(() => {
        window.scrollTo(0, 0);

        if (isMobileCategory) {
            const fetchProducts = async () => {
                setLoading(true);
                try {
                    const response = await api.get('/products');
                    setProducts(response.data);
                } catch (err) {
                    console.error('Error fetching products:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [categoryName, isMobileCategory]);

    const formatCategoryName = (slug) => {
        if (!slug) return '';
        if (slug === 'tv-ac-appliances') return 'TV, AC & Appliances';
        if (slug === 'kitchen-home') return 'Kitchen & Home';
        if (slug === 'health-wellness') return 'Health & Wellness';
        if (slug === 'baby-kids') return 'Baby & Kids';
        if (slug === 'sports-fitness') return 'Sports & Fitness';

        return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
    };

    const displayName = formatCategoryName(categoryName);

    return (
        <div className="category-page">
            <div className="container">
                <div className="category-header">
                    <h1 className="category-title">{displayName}</h1>
                </div>

                {loading ? (
                    <div className="products-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skel skel-img" />
                                <div className="skel skel-text" />
                                <div className="skel skel-text short" />
                            </div>
                        ))}
                    </div>
                ) : isMobileCategory ? (
                    <div className="products-grid">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <h2>No products found in this category.</h2>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="coming-soon-state">
                        <div className="coming-soon-content">
                            <h2>Products Not Added Yet</h2>
                            <p>Sorry, the products for <strong>{displayName}</strong> are not added yet.</p>
                            <p>Explore our Mobile categories in the meantime!</p>
                            <Link to="/category/mobiles" className="explore-btn">
                                Explore Mobiles
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
