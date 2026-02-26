import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { H1, H2, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import inventory from '../data/inventory.json';

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const product = useMemo(() => inventory.find(p => p.id === id), [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <H2 className="mb-4">Product Not Found</H2>
                <Button variant="outline" onClick={() => navigate('/shop')}>Back to Shop</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setAdded(true);
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen pt-24 pb-24 bg-offwhite">
            <div className="container mx-auto px-6 md:px-12">
                <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center text-sm uppercase tracking-widest text-charcoal/60 hover:text-charcoal mb-12 transition-colors focus:outline-none"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> back to shop
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {/* Left: Sticky Image */}
                    <div className="relative">
                        <div className="sticky top-32 w-full aspect-[3/4] bg-white border border-charcoal/5 flex items-center justify-center p-12">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center py-12"
                    >
                        <div className="mb-8">
                            <Text className="text-sm uppercase tracking-widest text-charcoal/60 mb-4">
                                {product.region}
                            </Text>
                            <H1 className="mb-6">{product.name}</H1>
                            <H2 className="text-3xl font-serif text-charcoal">
                                £{product.price.toFixed(2)}
                            </H2>
                        </div>

                        <div className="mb-12">
                            <Text className="mb-6 leading-relaxed">
                                A masterpiece of minimal intervention winemaking. This exceptional {product.type} wine expresses the unique terroir and careful craftsmanship in every sip. Best enjoyed slightly chilled.
                            </Text>

                            <div className="border-t border-b border-charcoal/10 py-6 my-8">
                                <Text className="uppercase text-xs tracking-widest text-charcoal/60 mb-4">Tasting Notes</Text>
                                <div className="flex flex-wrap gap-2">
                                    {product.tastingNotes.map((note, idx) => (
                                        <span key={idx} className="bg-charcoal/5 px-4 py-2 text-sm text-charcoal font-medium">
                                            {note}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <Text className="uppercase text-xs tracking-widest text-charcoal/60 mb-3">Quantity</Text>
                            <div className="flex items-center border border-charcoal/20 w-fit">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-3 px-4 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors focus:outline-none"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-base px-6 text-charcoal font-medium min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-3 px-4 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors focus:outline-none"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <Button
                            className="w-full py-5 text-base relative overflow-hidden group"
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? (
                                <span className="flex items-center justify-center"><Check className="mr-2" /> Added to Cart</span>
                            ) : (
                                `Add to Cart — £${(product.price * quantity).toFixed(2)}`
                            )}
                        </Button>

                        <div className="mt-8 grid grid-cols-2 gap-4 text-xs tracking-widest uppercase text-charcoal/60">
                            <div className="flex items-center"><Check className="w-3 h-3 mr-2" /> Free shipping over £100</div>
                            <div className="flex items-center"><Check className="w-3 h-3 mr-2" /> Secure checkout</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
