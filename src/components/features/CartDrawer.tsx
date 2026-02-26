import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { H3, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import { AnimatePresence, motion } from 'framer-motion';

export function CartDrawer() {
    const navigate = useNavigate();
    const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCartStore();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 right-0 w-full md:w-[480px] h-full bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 md:p-10 border-b border-charcoal/10">
                            <H3 className="m-0">Your Cart</H3>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-charcoal hover:bg-charcoal/5 rounded-full transition-colors focus:outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <Text>Your cart is empty.</Text>
                                    <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center">
                                        <div className="w-20 h-24 bg-offwhite p-2">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-serif text-lg text-charcoal">{item.name}</h4>
                                            <Text className="text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                                                {item.type}
                                            </Text>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-charcoal/20">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-3 text-charcoal/60 hover:text-charcoal transition-colors focus:outline-none"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm px-2 text-charcoal w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-3 text-charcoal/60 hover:text-charcoal transition-colors focus:outline-none"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-medium text-charcoal">
                                                    £{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-charcoal/40 hover:text-burgundy transition-colors focus:outline-none"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 md:p-10 border-t border-charcoal/10 bg-offwhite mt-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-serif text-lg">Subtotal</span>
                                    <span className="font-serif text-2xl text-charcoal">£{cartTotal().toFixed(2)}</span>
                                </div>
                                <Text className="text-xs text-charcoal/60 mb-6">
                                    Delivery calculated at checkout.
                                </Text>
                                <div className="flex flex-col gap-4">
                                    <Button className="w-full py-4 text-base" onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}>
                                        Checkout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
