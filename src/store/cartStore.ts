import { create } from 'zustand';
import { Product } from '../components/features/ProductCard';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    addItem: (item: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isCartOpen: false,
    addItem: (product) => {
        set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
        });
    },
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
            ),
        })),
    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    cartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
}));
