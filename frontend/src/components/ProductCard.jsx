import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const defaultVariant = product.variants?.find(v => v.isDefault) || product.variants?.[0];
    const discount = Math.round(((product.mrp - product.basePrice) / product.mrp) * 100);
    const bestEmi = product.emiPlans?.find(e => e.interestRate === 0) || product.emiPlans?.[0];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link to={`/product/${defaultVariant?.slug || product.slug}`} className="product-card">
            <div className="card-image">
                <img
                    src={defaultVariant.imageUrl}
                    alt={product.name}
                />
                {bestEmi && bestEmi.interestRate === 0 && (
                    <span className="emi-badge">0.0% EMI</span>
                )}
            </div>

            <div className="card-info">
                {bestEmi && (
                    <div className="monthly-price">
                        <span className="rupee">₹</span>
                        <span className="amount">
                            {Math.round(bestEmi.monthlyAmount).toLocaleString('en-IN')}
                        </span>
                        <span className="per-month">/month</span>
                    </div>
                )}

                <p className="product-name">{product.name}</p>

                <div className="price-row">
                    <span className="selling-price">{formatPrice(product.basePrice)}</span>
                    {product.mrp > product.basePrice && (
                        <>
                            <span className="original-price">{formatPrice(product.mrp)}</span>
                            <span className="discount">({discount}% Off)</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
