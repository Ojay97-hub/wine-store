import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
    return (
        <h1
            className={`font-serif text-5xl md:text-7xl tracking-tighter text-charcoal ${className || ''}`}
            {...props}
        >
            {children}
        </h1>
    );
}

export function H2({ children, className, ...props }: TypographyProps) {
    return (
        <h2
            className={`font-serif text-3xl md:text-5xl tracking-tight text-charcoal ${className || ''}`}
            {...props}
        >
            {children}
        </h2>
    );
}

export function H3({ children, className, ...props }: TypographyProps) {
    return (
        <h3
            className={`font-serif text-xl md:text-3xl tracking-tight text-charcoal ${className || ''}`}
            {...props}
        >
            {children}
        </h3>
    );
}

export function Text({ children, className, ...props }: TypographyProps) {
    return (
        <p
            className={`font-sans text-base leading-relaxed text-charcoal/80 ${className || ''}`}
            {...props}
        >
            {children}
        </p>
    );
}
