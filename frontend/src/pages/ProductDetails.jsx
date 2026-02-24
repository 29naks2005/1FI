import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, RefreshCw, Award, Lock } from 'lucide-react';
import api from '../api/api';
import './ProductDetails.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

const getHexForColorName = (colorName) => {
    const defaultColors = {
        'Silver': '#f5f5f0',
        'Black': '#2c2c2e',
        'Cosmic Orange': '#e36c2d',
        'Titanium Gray': '#868482',
        'Phantom Black': '#1a1a1a',
        'Emerald Green': '#314e42',
        'Obsidian': '#222222',
        'Porcelain': '#fdfaf5'
    };
    return defaultColors[colorName] || '#dddddd';
};

function ProductDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProductData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/products/${slug}`);
                const productData = response.data;

                setProduct(productData);

                let targetVariant;
                if (productData.matchedVariantSlug) {
                    targetVariant = productData.variants?.find(v => v.slug === productData.matchedVariantSlug);
                }

                if (!targetVariant) {
                    targetVariant = productData.variants?.find(v => v.isDefault) || productData.variants?.[0];
                }

                setSelectedVariant(targetVariant);

                if (productData.emiPlans && productData.emiPlans.length > 0) {
                    const defaultEmi = productData.emiPlans.find(plan => plan.tenureMonths === 12) || productData.emiPlans[0];
                    setSelectedEmiPlan(defaultEmi);
                }
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="product-details-page is-loading">
                <div className="loading-spinner" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page error">
                <h2>Product not found</h2>
                <button className="back-btn" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    const sortedEmiPlans = [...(product.emiPlans || [])].sort((a, b) => a.tenureMonths - b.tenureMonths);
    const currentPriceToDisplay = selectedVariant?.price || product.basePrice;
    const parsedSpecs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;

    return (
        <div className="product-details-page">
            <div className="container product-details-container">

                <div className="product-visuals">
                    <div className="product-card">
                        <div className="product-header">
                            <span className="badge-new">NEW</span>
                            <h1 className="product-title">{product.name}</h1>
                            <span className="product-storage">{selectedVariant?.storage}</span>
                        </div>

                        <div className="image-wrapper">
                            <img
                                src={selectedVariant?.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>

                        {product.variants?.length > 0 && (
                            <div className="color-variants">
                                <p className="variants-label">Available in {product.variants.length} finishes</p>
                                <div className="color-options">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            className={`color-circle ${selectedVariant?.id === variant.id ? 'selected-color' : ''}`}
                                            style={{ backgroundColor: getHexForColorName(variant.color) }}
                                            onClick={() => navigate(`/product/${variant.slug}`)}
                                            title={variant.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="product-info">

                    <div className="pricing-section">
                        <h2 className="current-price">{formatCurrency(currentPriceToDisplay)}</h2>
                        {product.mrp > currentPriceToDisplay && (
                            <p className="original-price">{formatCurrency(product.mrp)}</p>
                        )}
                        <p className="emi-notice">EMI plans backed by mutual funds</p>
                    </div>

                    <div className="emi-plans-container">
                        {sortedEmiPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`emi-plan-card ${selectedEmiPlan?.id === plan.id ? 'active-plan' : ''}`}
                                onClick={() => setSelectedEmiPlan(plan)}
                            >
                                <div className="plan-details">
                                    <p className="monthly-installment">
                                        {formatCurrency(Math.round(plan.monthlyAmount))} x {plan.tenureMonths} months
                                    </p>
                                    {plan.cashback > 0 && (
                                        <p className="cashback-offer">
                                            Additional cashback of {formatCurrency(plan.cashback)}
                                        </p>
                                    )}
                                </div>
                                <div className="plan-interest">
                                    <p className="interest-rate">
                                        {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedEmiPlan && (
                        <div className="purchase-section">
                            <button className="buy-button">
                                Buy on {selectedEmiPlan.tenureMonths} month EMI
                            </button>
                        </div>
                    )}

                    <div className="additional-info-section">
                        <p className="seller-info">Sold by : <strong>Balaji Infocom</strong></p>

                        <div className="info-block">
                            <h3 className="info-heading">Shipping Details:</h3>
                            <p className="info-description">
                                Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch
                            </p>
                        </div>

                        <div className="info-block">
                            <h3 className="info-heading">Shop with Confidence</h3>
                            <div className="features-grid">
                                <div className="feature-item">
                                    <RefreshCw size={24} className="feature-icon" />
                                    <span>2 Days Service Centre Replacement</span>
                                </div>
                                <div className="feature-item">
                                    <Award size={24} className="feature-icon" />
                                    <span>Top Brand</span>
                                </div>
                                <div className="feature-item">
                                    <Truck size={24} className="feature-icon" />
                                    <span>Free Delivery</span>
                                </div>
                                <div className="feature-item">
                                    <Lock size={24} className="feature-icon" />
                                    <span>Secure Transaction</span>
                                </div>
                            </div>
                        </div>

                        {parsedSpecs && (
                            <div className="info-block">
                                <h3 className="info-heading">Product Details</h3>
                                <ul className="specs-list">
                                    {parsedSpecs.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;
