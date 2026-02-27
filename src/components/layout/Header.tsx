import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Mail } from 'lucide-react';
import { H3 } from '../ui/Typography';

import { useCartStore } from '../../store/cartStore';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { items, setIsCartOpen } = useCartStore();

    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out border-b ${isScrolled ? 'bg-offwhite border-charcoal/10 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <button className="md:hidden text-charcoal focus:outline-none">
                    <Menu className="w-6 h-6" />
                </button>

                <Link to="/" className="text-center flex-1 md:flex-none">
                    <H3 className="uppercase tracking-widest text-lg md:text-2xl m-0">Vino</H3>
                </Link>

                <nav className="hidden md:flex items-center space-x-12 absolute left-1/2 -translate-x-1/2">
                    <Link to="/shop" className="text-sm tracking-widest uppercase text-charcoal hover:text-charcoal/70 transition-all">Shop</Link>
                    <Link to="/about" className="text-sm tracking-widest uppercase text-charcoal hover:text-charcoal/70 transition-all">Story</Link>
                    <Link to="/club" className="text-sm tracking-widest uppercase text-charcoal hover:text-charcoal/70 transition-all">Club</Link>
                </nav>

                <div className="flex items-center space-x-6">
                    <a
                        href="mailto:contact@vino.com"
                        className="text-charcoal hover:text-charcoal/70 transition-all flex items-center"
                        title="Contact Us"
                    >
                        <span className="sr-only">Contact Us</span>
                        <Mail className="w-5 h-5" />
                    </a>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-charcoal focus:outline-none flex items-center group"
                    >
                        <span className="sr-only">Cart</span>
                        <ShoppingCart className="w-6 h-6 transition-all group-hover:opacity-70" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

