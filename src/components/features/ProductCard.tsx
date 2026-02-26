import { Link } from 'react-router-dom';
import { Text } from '../ui/Typography';

export interface Product {
    id: string;
    name: string;
    type: string;
    region: string;
    price: number;
    tastingNotes: string[];
    image: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link to={`/product/${product.id}`} className="group block w-full text-center">
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-white px-8 py-12 flex items-center justify-center border border-charcoal/5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 ease-out" />
            </div>
            <div className="space-y-2">
                <h4 className="font-serif text-xl text-charcoal group-hover:text-charcoal/70 transition-colors">
                    {product.name}
                </h4>
                <Text className="text-xs uppercase tracking-widest text-charcoal/60">
                    {product.region}
                </Text>
                <Text className="text-sm font-medium mt-4">
                    £{product.price.toFixed(2)}
                </Text>
            </div>
        </Link>
    );
}
