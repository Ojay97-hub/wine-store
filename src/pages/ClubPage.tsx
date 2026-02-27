import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { H1, H2, H3, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { WaitlistModal } from '../components/features/WaitlistModal';
import { useState } from 'react';

export function ClubPage() {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const benefits = [
        {
            title: 'Curated Selections',
            description: 'Receive hand-picked allocations of our new releases, library vintages, and club-exclusive small batch wines, delivered directly to your door.'
        },
        {
            title: 'Priority Access',
            description: 'Skip the waitlist. Club members always get first dibs on our most limited production wines before they are released to the public.'
        },
        {
            title: 'Complimentary Tastings',
            description: 'Enjoy complimentary tastings for you and up to three guests whenever you visit our estate tasting room.'
        },
        {
            title: 'Member Pricing',
            description: 'Receive an exclusive 15% preferred pricing on all wine purchases, both online and in person.'
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <H1 className="mb-6">The Vino Club</H1>
                    <Text className="text-xl md:text-2xl text-charcoal/70">
                        Join our inner circle and experience the best of what we do.
                    </Text>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/wine_club_box.png"
                            alt="Premium wine club box"
                            className="w-full h-auto object-cover rounded-sm shadow-xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <H2>More Than Just Wine</H2>
                        <Text className="text-lg">
                            The Vino Club is an invitation to deepen your connection with our terroir. We design our shipments to tell a story—whether exploring a single vintage across different vineyards, or experiencing the aging potential of our flagship blends.
                        </Text>

                        <div className="space-y-6 mt-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="border-l-2 border-burgundy pl-6">
                                    <H3 className="text-lg mb-2">{benefit.title}</H3>
                                    <Text className="text-sm">{benefit.description}</Text>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Button
                                onClick={() => setIsWaitlistOpen(true)}
                                className="w-full md:w-auto"
                            >
                                Join the Waitlist
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
            />
        </div>
    );
}
