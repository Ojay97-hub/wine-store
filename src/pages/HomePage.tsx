import { motion } from 'framer-motion';
import { H1, H2, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/features/ProductCard';
import inventory from '../data/inventory.json';

export function HomePage() {
    const featured = inventory.slice(0, 4);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/images/hero-vineyard.png"
                        alt="Misty Vineyard"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/30" />
                </div>

                <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <H1 className="text-offwhite mb-6 max-w-4xl mx-auto leading-tight">
                            Wine defined by nature,<br />refined by intention.
                        </H1>
                        <Text className="text-offwhite/80 max-w-lg mx-auto mb-10 text-lg">
                            Discover small-batch, minimal intervention wines from the world's most deliberate winemakers.
                        </Text>
                        <Button onClick={() => window.location.href = '/shop'} className="bg-white text-charcoal hover:bg-white/90">
                            Explore Collection
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Featured Grid */}
            <section className="py-32 bg-offwhite">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                    >
                        <div>
                            <H2 className="mb-4">New Arrivals</H2>
                            <Text>The latest additions to our cellar.</Text>
                        </div>
                        <a href="/shop" className="text-sm tracking-widest uppercase border-b border-charcoal pb-1 hover:text-charcoal/60 transition-colors mt-6 md:mt-0 inline-block">
                            View All
                        </a>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featured.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <ProductCard product={item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Story */}
            <section className="py-32 bg-charcoal text-offwhite">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 aspect-square bg-offwhite/10 p-12 flex items-center justify-center"
                    >
                        {/* Abstract visual or secondary image could go here */}
                        <div className="w-full h-full border border-offwhite/20 flex items-center justify-center p-8">
                            <H2 className="text-offwhite text-center italic opacity-80">"Wine is bottled poetry."</H2>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <H2 className="text-offwhite mb-8">Rooted in Tradition,<br />Crafted for Today.</H2>
                        <Text className="text-offwhite/70 mb-6 text-lg">
                            We believe that the best wines are made in the vineyard, not the laboratory.
                            Our collection features exclusively sustainable, organic, and biodynamic producers.
                        </Text>
                        <Text className="text-offwhite/70 mb-10">
                            Each bottle tells the story of its terroir, untouched by unnatural additives or
                            manipulative techniques. Just grapes, time, and dedication.
                        </Text>
                        <Button variant="outline" className="border-offwhite text-offwhite hover:bg-offwhite hover:text-charcoal">
                            Read Our Story
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
