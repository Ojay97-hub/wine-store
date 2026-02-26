import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { H1, Text } from '../components/ui/Typography';
import { ProductCard } from '../components/features/ProductCard';
import inventory from '../data/inventory.json';

export function ShopPage() {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filters = [
        { id: 'all', label: 'All Wines' },
        { id: 'red', label: 'Red' },
        { id: 'white', label: 'White' },
        { id: 'sparkling', label: 'Sparkling' },
        { id: 'rose', label: 'Rosé' },
    ];

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'all') return inventory;
        return inventory.filter(item => item.type === activeFilter);
    }, [activeFilter]);

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16 text-center"
            >
                <H1 className="mb-6">The Collection</H1>
                <Text className="max-w-2xl mx-auto">
                    Explore our curated selection of minimal-intervention wines.
                    Use the filters below to find your perfect bottle.
                </Text>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`text-sm tracking-widest uppercase pb-1 transition-all ${activeFilter === filter.id
                                ? 'border-b border-charcoal text-charcoal'
                                : 'border-b border-transparent text-charcoal/50 hover:text-charcoal'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((item, i) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <ProductCard product={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <Text>No wines found matching this category.</Text>
                </div>
            )}
        </div>
    );
}
