import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../ui/Button';
import { Text } from '../ui/Typography';

interface StripePaymentFormProps {
    onSuccess: () => void;
    onBack: () => void;
}

export function StripePaymentForm({ onSuccess, onBack }: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/checkout',
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 border border-charcoal/10">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                    }}
                />
            </div>

            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {errorMessage}
                </div>
            )}

            <Text className="text-xs text-charcoal/60">
                Your payment is processed securely by Stripe. We never store your card details.
            </Text>

            <div className="pt-8 flex justify-between items-center border-t border-charcoal/10">
                <button type="button" onClick={onBack} className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-charcoal border-b border-transparent hover:border-charcoal/30 pb-0.5 transition-all">
                    Back
                </button>
                <Button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="min-w-[180px]"
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing…
                        </span>
                    ) : (
                        'Place Order'
                    )}
                </Button>
            </div>
        </form>
    );
}
