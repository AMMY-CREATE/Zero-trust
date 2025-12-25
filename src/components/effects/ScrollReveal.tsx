import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: "slide-up" | "slide-left" | "slide-right" | "fade" | "scale";
    delay?: number;
    threshold?: number;
    className?: string;
    once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    variant = "slide-up",
    delay = 0,
    threshold = 0.1,
    className = "",
    once = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, once]);

    const getVariantClass = () => {
        switch (variant) {
            case "slide-left": return "reveal-slide-left";
            case "slide-right": return "reveal-slide-right";
            case "scale": return "scale-90";
            default: return "";
        }
    };

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`reveal-hidden ${isVisible ? "reveal-visible" : ""} ${getVariantClass()} ${className}`}
        >
            {children}
        </div>
    );
};
