import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Minus, Plus, Trash2 } from 'lucide-react';
import { H2, H3, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCartStore } from '../store/cartStore';
import { StripePaymentForm } from '../components/features/StripePaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function CheckoutPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const { items, cartTotal, updateQuantity, removeItem } = useCartStore();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const deliveryCost = cartTotal() >= 100 ? 0 : 5.95;
    const orderTotal = cartTotal() + deliveryCost;

    // Create PaymentIntent when reaching the payment step
    useEffect(() => {
        if (step === 3 && !clientSecret && items.length > 0) {
            const amountInPence = Math.round(orderTotal * 100);
            fetch('http://localhost:3001/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountInPence }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret);
                    } else {
                        setPaymentError('Could not initialise payment. Please try again.');
                    }
                })
                .catch(() => {
                    setPaymentError('Could not connect to payment server. Please ensure the server is running.');
                });
        }
    }, [step, clientSecret, items.length, orderTotal]);

    if (items.length === 0 && step < 4) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center">
                <H2 className="mb-6">Your Cart is Empty</H2>
                <Text className="mb-8 max-w-md mx-auto">You have no items in your cart to checkout. Return to the shop to discover our collection.</Text>
                <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
            </div>
        );
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(s => Math.min(s + 1, 4));
    };

    const stepLabels = ['Cart', 'Details', 'Delivery', 'Payment'];
    const totalSteps = 4;

    return (
        <div className="min-h-screen pt-24 pb-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center text-xs uppercase tracking-widest text-charcoal/60 hover:text-charcoal mb-12 transition-colors focus:outline-none"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> continue shopping
                </button>

                {step < 4 && (
                    <div className="mb-12 flex justify-between items-center border-b border-charcoal/10 pb-8 relative">
                        <div className="absolute bottom-0 left-0 h-[1px] bg-charcoal transition-all duration-500" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
                        {[0, 1, 2, 3].map(s => (
                            <div key={s} className="flex flex-col items-center gap-2 z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === s ? 'bg-charcoal text-offwhite' :
                                    step > s ? 'bg-charcoal/10 text-charcoal' : 'bg-offwhite text-charcoal/40'
                                    }`}>
                                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s + 1}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest ${step >= s ? 'text-charcoal' : 'text-charcoal/40'}`}>
                                    {stepLabels[s]}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-offwhite p-10 relative overflow-hidden min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {/* Step 0: Cart Review */}
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                <H3>Your Cart</H3>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-6 items-center bg-white p-4 border border-charcoal/5">
                                            <Link to={`/product/${item.id}`} className="w-20 h-24 bg-offwhite p-2 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/product/${item.id}`} className="hover:opacity-70 transition-opacity">
                                                    <h4 className="font-serif text-lg text-charcoal">{item.name}</h4>
                                                </Link>
                                                <Text className="text-xs uppercase tracking-widest text-charcoal/60 mb-3">
                                                    {item.type} · {item.region}
                                                </Text>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center border border-charcoal/20">
                                                        <button
                                                            onClick={() => {
                                                                if (item.quantity <= 1) {
                                                                    removeItem(item.id);
                                                                } else {
                                                                    updateQuantity(item.id, item.quantity - 1);
                                                                }
                                                            }}
                                                            className="p-1.5 px-3 text-charcoal/60 hover:text-charcoal transition-colors focus:outline-none"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm px-2 text-charcoal w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1.5 px-3 text-charcoal/60 hover:text-charcoal transition-colors focus:outline-none"
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
                                                className="p-2 text-charcoal/40 hover:text-red-600 transition-colors focus:outline-none shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-charcoal/10 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm text-charcoal/60">
                                        <span>Subtotal</span>
                                        <span>£{cartTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-charcoal/60">
                                        <span>Delivery</span>
                                        <span>{deliveryCost === 0 ? 'Free' : `£${deliveryCost.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-charcoal/10">
                                        <span className="font-serif text-lg">Total</span>
                                        <span className="font-serif text-2xl text-charcoal">
                                            £{orderTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button onClick={() => setStep(1)}>Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 1: Contact Details */}
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleNext}
                                className="space-y-8"
                            >
                                <H3>Contact Information</H3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="First Name" required placeholder="James" />
                                    <Input label="Last Name" required placeholder="Smith" />
                                </div>
                                <Input label="Email Address" type="email" required placeholder="james@example.co.uk" />
                                <Input label="Phone Number" type="tel" placeholder="+44 7700 900000" />
                                <div className="pt-8 flex justify-between items-center border-t border-charcoal/10">
                                    <button type="button" onClick={() => setStep(0)} className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-charcoal">Back to Cart</button>
                                    <Button type="submit">Continue to Delivery <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 2: Delivery Address (UK format) */}
                        {step === 2 && (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleNext}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <H3 className="m-0">Delivery Address</H3>
                                    <button type="button" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest border-b border-charcoal/30">Edit Details</button>
                                </div>
                                <Input label="Address Line 1" required placeholder="10 Downing Street" />
                                <Input label="Address Line 2 (optional)" placeholder="Flat 2B" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="Town / City" required placeholder="London" />
                                    <Input label="County (optional)" placeholder="Greater London" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="Postcode" required placeholder="SW1A 1AA" />
                                    <Input label="Country" required placeholder="United Kingdom" />
                                </div>
                                <div className="pt-8 flex justify-between items-center border-t border-charcoal/10">
                                    <button type="button" onClick={() => setStep(1)} className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-charcoal">Back</button>
                                    <Button type="submit">Continue to Payment <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 3: Stripe Payment */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <H3 className="m-0">Payment</H3>
                                    <div className="text-right">
                                        <Text className="text-sm">Order Total:</Text>
                                        <span className="font-serif text-2xl">£{orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {paymentError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                                        {paymentError}
                                    </div>
                                )}

                                {clientSecret ? (
                                    <Elements
                                        stripe={stripePromise}
                                        options={{
                                            clientSecret,
                                            appearance: {
                                                theme: 'stripe',
                                                variables: {
                                                    colorPrimary: '#2C2C2C',
                                                    colorBackground: '#ffffff',
                                                    colorText: '#2C2C2C',
                                                    fontFamily: '"Cormorant Garamond", serif',
                                                    borderRadius: '0px',
                                                },
                                            },
                                        }}
                                    >
                                        <StripePaymentForm onSuccess={() => setStep(4)} onBack={() => setStep(2)} />
                                    </Elements>
                                ) : !paymentError ? (
                                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                        <svg className="animate-spin h-8 w-8 text-charcoal/40" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <Text className="text-charcoal/60">Loading payment form…</Text>
                                    </div>
                                ) : null}
                            </motion.div>
                        )}

                        {/* Step 4: Confirmation */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-16 h-16 bg-charcoal text-offwhite rounded-full flex items-center justify-center mb-8">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <H2 className="mb-4">Order Confirmed</H2>
                                <Text className="mb-8 max-w-md mx-auto text-charcoal/60">
                                    Thank you for your purchase. Your exquisite selection of minimal-intervention wines is being prepared for dispatch.
                                </Text>
                                <Button onClick={() => navigate('/')}>Return to Home</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
