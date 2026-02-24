import { useState, useEffect } from 'react';
import api from './api/api';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
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
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroBanner />
        <section className="products-section" id="products">
          <div className="container">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked premium devices at unbeatable prices</p>
            <div className="products-grid">
              {loading
                ? [1, 2, 3].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skel skel-img" />
                    <div className="skel skel-text" />
                    <div className="skel skel-text short" />
                  </div>
                ))
                : products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
