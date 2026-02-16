import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveInterestTracker: React.FC = () => {
    // Initial random count between 12 and 45
    const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * (45 - 12 + 1)) + 12);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show component after a short delay
        const showTimer = setTimeout(() => setIsVisible(true), 2000);

        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        const updateCount = () => {
            setViewerCount(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                let newCount = prev + change;
                // Keep within realistic bounds (e.g., 10 to 60)
                if (newCount < 10) newCount = 10 + Math.floor(Math.random() * 5);
                if (newCount > 60) newCount = 60 - Math.floor(Math.random() * 5);
                return newCount;
            });

            // Schedule next update between 10s and 20s
            const nextInterval = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
            timeoutId = setTimeout(updateCount, nextInterval);
        };

        let timeoutId = setTimeout(updateCount, 15000); // Initial update delay

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div className="flex items-center gap-3 px-5 py-3 bg-black/70 backdrop-blur-md rounded-full border border-white/10 shadow-2xl text-white pointer-events-auto">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-sm font-medium whitespace-nowrap">
                            🔥 현재 <span className="font-bold text-red-400 tabular-nums">{viewerCount}</span>명의 투자자가 이 도메인을 보고 있습니다.
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LiveInterestTracker;
