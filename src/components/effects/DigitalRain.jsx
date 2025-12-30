import React, { useEffect, useRef } from 'react';

export const DigitalRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;

        const chars = "0123456789ABCDEF01";
        const charSet = chars.split("");

        const fontSize = 35;
        const columns = Math.ceil(width / fontSize);

        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // FPS Control: 30 FPS
        const fps = 30;
        const fpsInterval = 1000 / fps;
        let lastDrawTime = Date.now();

        // Scroll coordination
        let scrollY = window.scrollY;
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);

        const draw = () => {
            const now = Date.now();
            const elapsed = now - lastDrawTime;

            if (elapsed > fpsInterval) {
                lastDrawTime = now - (elapsed % fpsInterval);

                ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                ctx.fillRect(0, 0, width, height);

                ctx.font = `${fontSize}px JetBrains Mono, monospace`;

                for (let i = 0; i < drops.length; i++) {
                    const text = charSet[Math.floor(Math.random() * charSet.length)];
                    const opacity = Math.random() > 0.7 ? 0.4 : 0.2;
                    ctx.fillStyle = `rgba(0, 255, 1, ${opacity})`;

                    const scrollOffset = scrollY * 0.15;
                    const yPos = (drops[i] * fontSize + scrollOffset) % (height || 1);

                    ctx.fillText(text, i * fontSize, yPos);

                    if (yPos > height && Math.random() > 0.975) {
                        drops[i] = -fontSize;
                    }

                    drops[i] += 0.5;
                }
            }
        };

        let animationFrameId;
        const render = () => {
            draw();
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ zIndex: 0 }}
        />
    );
};
