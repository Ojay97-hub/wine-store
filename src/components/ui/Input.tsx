import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, id, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-xs font-medium text-charcoal/60 mb-1 uppercase tracking-wider"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={`block w-full appearance-none border-0 border-b border-charcoal/20 bg-transparent px-0 py-2 text-charcoal focus:border-charcoal focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-charcoal/40 ${className || ''}`}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';
