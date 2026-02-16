import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
    title: string;
    link: string;
}

const NewsTicker = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%25EC%25A1%25B0%25EA%25B5%25AD%26hl%3Dko%26gl%3DKR%26ceid%3DKR%3Ako'
                );
                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedNews = data.items.map((item: any) => ({
                        title: item.title,
                        link: item.link
                    }));
                    setNews(formattedNews);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // Refresh news every 5 minutes
        const interval = setInterval(fetchNews, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading || error || news.length === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 text-white overflow-hidden flex flex-col md:flex-row h-auto md:h-10 border-b border-neutral-800">
            <div className="bg-red-600 text-white px-4 py-1 md:py-0 w-full md:w-auto h-auto md:h-full flex items-center justify-center md:justify-start font-bold text-[10px] md:text-xs uppercase tracking-wider shrink-0 z-10 relative shadow-md">
                Breaking News
            </div>

            <div
                className="w-full md:flex-1 overflow-hidden relative h-8 md:h-full flex items-center mask-image-gradient bg-neutral-900"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex whitespace-nowrap gap-8"
                    animate={{ x: isHovered ? undefined : ["0%", "-100%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: news.length * 10, // Adjust speed based on content length
                            ease: "linear",
                        }
                    }}
                    style={{ x: isHovered ? undefined : 0 }}
                >
                    {/* Repeat the list twice to ensure smooth seamless looping */}
                    {[...news, ...news].map((item, index) => (
                        <a
                            key={`${item.link}-${index}`}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-yellow-400 transition-colors text-xs md:text-sm font-medium py-1 px-4 md:px-0"
                        >
                            <span className="text-red-500">•</span>
                            {item.title}
                        </a>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default NewsTicker;
