import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-pink/10" />

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     border border-dark-border bg-dark-surface/50 mb-8"
                >
                    <Sparkles size={16} className="text-accent-purple" />
                    <span className="text-sm text-dark-muted">Available for freelance work</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-balance"
                >
                    I craft <span className="gradient-text">digital</span>
                    <br />
                    experiences
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-dark-muted max-w-2xl mx-auto mb-12"
                >
                    Product Designer specializing in creating intuitive interfaces
                    and meaningful user experiences for digital products.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="#work" className="btn-primary">
                        View My Work
                    </a>
                    <a href="#contact" className="btn-outline">
                        Get in Touch
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-dark-muted"
                    >
                        <ArrowDown size={24} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
