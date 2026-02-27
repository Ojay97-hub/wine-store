import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { H3, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setIsSubmitting(false);
            setIsSuccess(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-offwhite w-full max-w-md p-8 md:p-10 pointer-events-auto rounded-sm shadow-2xl relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-16 h-16 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <H3 className="mb-4 text-2xl">You're on the list</H3>
                                    <Text className="mb-8">
                                        Thank you for your interest. We'll be in touch as soon as a spot becomes available.
                                    </Text>
                                    <Button onClick={onClose} className="w-full">
                                        Close
                                    </Button>
                                </motion.div>
                            ) : (
                                <div className="py-2">
                                    <H3 className="mb-2 text-2xl">Join the Waitlist</H3>
                                    <Text className="mb-8 text-sm">
                                        Enter your email below to be notified when memberships open up.
                                    </Text>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <Input
                                            type="email"
                                            label="Email Address"
                                            placeholder="hello@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isSubmitting || !email}
                                        >
                                            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
