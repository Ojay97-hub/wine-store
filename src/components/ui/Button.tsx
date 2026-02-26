import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charcoal';

        const variants = {
            primary: 'bg-charcoal text-offwhite hover:bg-charcoal/90 border border-transparent',
            outline: 'bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-offwhite',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
