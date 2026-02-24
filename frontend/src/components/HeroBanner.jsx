import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './HeroBanner.css';

const slides = [
    {
        id: 1,
        tag: 'CRAZY DEALS',
        subtitle: 'Pay only',
        highlight: '₹19',
        after: 'now',
        desc: 'Grab the best tech at prices that blow your mind',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pYyUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
    },
    {
        id: 2,
        tag: 'JUST LAUNCHED',
        subtitle: 'Upgrade to',
        highlight: '0% EMI',
        after: 'on everything',
        desc: 'The latest smartphones are here — own them with no extra cost',
        image: 'https://www.oneplus.com/content/dam/oasis/page/2023/global/home/salami-share.jpg',
    },
    {
        id: 3,
        tag: 'EXCLUSIVE OFFER',
        subtitle: 'Shop smart,',
        highlight: '0% EMI',
        after: 'no catch',
        desc: 'Top-rated electronics delivered free — zero interest, zero worries',
        image: 'https://images.unsplash.com/photo-1610438250910-01cb769c1334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

function HeroBanner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goPrev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
    const goNext = () => setCurrent(c => (c + 1) % slides.length);

    return (
        <section className="hero-banner">
            <div className="slides">
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`slide ${i === current ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="slide-overlay" />
                        <div className="slide-content">
                            <span className="slide-tag">{slide.tag}</span>
                            <div className="slide-headline">
                                <span className="slide-sub">{slide.subtitle}</span>
                                <span className="slide-big">{slide.highlight}</span>
                                <span className="slide-sub">{slide.after}</span>
                            </div>
                            <p className="slide-desc">{slide.desc}</p>
                            <button className="shop-now-btn">
                                Shop Now
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="arrow-btn left" onClick={goPrev}>
                <ChevronLeft size={20} />
            </button>
            <button className="arrow-btn right" onClick={goNext}>
                <ChevronRight size={20} />
            </button>

            <div className="dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === current ? 'active' : ''}`}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroBanner;
