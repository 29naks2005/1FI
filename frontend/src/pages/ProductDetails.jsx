import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import './ProductDetails.css';

function ProductDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedEmi, setSelectedEmi] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${slug}`);
                const data = response.data;
                setProduct(data);

                const defaultVar = data.variants?.find(v => v.isDefault) || data.variants?.[0];
                setSelectedVariant(defaultVar);

                if (data.emiPlans && data.emiPlans.length > 0) {
                    // Default to 12 months or the closest available
                    const defaultEmi = data.emiPlans.find(e => e.tenureMonths === 12) || data.emiPlans[0];
                    setSelectedEmi(defaultEmi);
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="pd-page loading">
                <div className="skel-spinner" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pd-page error">
                <h2>Product not found</h2>
                <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getVariantColorHex = (colorName) => {
        const colors = {
            'Silver': '#f5f5f0',
            'Black': '#2c2c2e',
            'Cosmic Orange': '#e36c2d',
            'Titanium Gray': '#868482',
            'Phantom Black': '#1a1a1a',
            'Emerald Green': '#314e42',
            'Obsidian': '#222222',
            'Porcelain': '#fdfaf5'
        };
        return colors[colorName] || '#dddddd';
    };

    const sortedEmiPlans = [...(product.emiPlans || [])].sort((a, b) => a.tenureMonths - b.tenureMonths);

    return (
        <div className="pd-page">
            <div className="container pd-container">

                {/* Left Side: Product Card */}
                <div className="pd-left">
                    <div className="pd-card">
                        <div className="pd-card-header">
                            <span className="pd-badge">NEW</span>
                            <h1 className="pd-title">{product.name}</h1>
                            <span className="pd-storage">{selectedVariant?.storage}</span>
                        </div>

                        <div className="pd-image-wrap">
                            <img src={selectedVariant?.imageUrl} alt={product.name} className="pd-image" />
                        </div>

                        {product.variants && product.variants.length > 0 && (
                            <div className="pd-variants">
                                <p className="pd-variants-text">Available in {product.variants.length} finishes</p>
                                <div className="pd-color-dots">
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.id}
                                            className={`pd-color-dot ${selectedVariant?.id === v.id ? 'active' : ''}`}
                                            style={{ backgroundColor: getVariantColorHex(v.color) }}
                                            onClick={() => setSelectedVariant(v)}
                                            title={v.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: EMI Plans */}
                <div className="pd-right">
                    <div className="pd-pricing">
                        <h2 className="pd-selling-price">{formatPrice(selectedVariant?.price || product.basePrice)}</h2>
                        {product.mrp > (selectedVariant?.price || product.basePrice) && (
                            <p className="pd-mrp">{formatPrice(product.mrp)}</p>
                        )}
                        <p className="pd-mutual-text">EMI plans backed by mutual funds</p>
                    </div>

                    <div className="pd-emi-list">
                        {sortedEmiPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`emi-card ${selectedEmi?.id === plan.id ? 'selected' : ''}`}
                                onClick={() => setSelectedEmi(plan)}
                            >
                                <div className="emi-card-left">
                                    <p className="emi-calc">
                                        {formatPrice(Math.round(plan.monthlyAmount))} x {plan.tenureMonths} months
                                    </p>
                                    {plan.cashback > 0 && (
                                        <p className="emi-cashback">
                                            Additional cashback of {formatPrice(plan.cashback)}
                                        </p>
                                    )}
                                </div>
                                <div className="emi-card-right">
                                    <p className="emi-interest">
                                        {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedEmi && (
                        <div className="pd-action">
                            <button className="buy-emi-btn">
                                Buy on {selectedEmi.tenureMonths} month EMI
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;
