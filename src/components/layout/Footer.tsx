import { H3, Text } from '../ui/Typography';

export function Footer() {
    return (
        <footer className="bg-charcoal text-offwhite py-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <H3 className="text-offwhite mb-6">Vino</H3>
                        <Text className="text-offwhite/60 max-w-sm mb-6">
                            Curating the world's finest minimal-intervention wines. Cultivated with respect, enjoyed with intention.
                        </Text>
                    </div>

                    <div>
                        <h4 className="text-offwhite font-serif text-lg mb-6 tracking-wide">Shop</h4>
                        <ul className="space-y-4">
                            <li><a href="/shop?filter=red" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Red Wine</a></li>
                            <li><a href="/shop?filter=white" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">White Wine</a></li>
                            <li><a href="/shop?filter=sparkling" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Sparkling</a></li>
                            <li><a href="/shop?filter=rose" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Rosé</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-offwhite font-serif text-lg mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="/about" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Our Story</a></li>
                            <li><a href="/contact" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Contact</a></li>
                            <li><a href="/faq" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">FAQ</a></li>
                            <li><a href="/terms" className="text-offwhite/60 hover:text-offwhite transition-all text-sm tracking-wider">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-offwhite/10 flex flex-col md:flex-row items-center justify-between text-offwhite/40 text-xs tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} Vino. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Please drink responsibly.</p>
                </div>
            </div>
        </footer>
    );
}
