import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { H1, H2, Text } from '../components/ui/Typography';

export function StoryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <H1 className="mb-6">Our Story</H1>
                    <Text className="text-xl md:text-2xl text-charcoal/70">
                        Three generations of slow, deliberate winemaking.
                    </Text>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/vineyard_family.png"
                            alt="The family in the vineyard"
                            className="w-full h-auto object-cover rounded-sm shadow-xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <H2>Rooted in Tradition</H2>
                        <Text>
                            It started over sixty years ago with a single acre of old-vine Grenache and a belief that the best wines are grown, not made. Our grandfather understood that true quality requires patience, and we've carried that philosophy into everything we do today.
                        </Text>
                        <Text>
                            We are a family of farmers first. We spend our mornings in the dirt, tending to the vines by hand, and our evenings tasting the slow evolution of our work in the cellar. There are no shortcuts here—only a deep respect for the land and the delicate balance of nature.
                        </Text>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center space-y-8 bg-white p-12 rounded-sm shadow-sm"
                >
                    <H2>Our Philosophy</H2>
                    <Text className="text-lg">
                        We believe in minimal intervention. By farming organically and allowing native yeast fermentations, we let the grapes speak for themselves. The result is a collection of wines that are vibrant, site-specific, and deeply authentic. We don't just make wine; we bottle a time and a place.
                    </Text>
                </motion.div>
            </div>
        </div>
    );
}
