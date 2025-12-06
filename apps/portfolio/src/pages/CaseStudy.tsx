import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export default function CaseStudy() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-dark-muted hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>
            </div>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-6 mb-16"
            >
                <div className={`aspect-video rounded-3xl overflow-hidden bg-gradient-to-br ${project.color}`}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
            </motion.div>

            {/* Project Info */}
            <div className="max-w-4xl mx-auto px-6 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {/* Header */}
                    <div className="mb-12">
                        <span className="text-accent-purple font-medium">{project.category}</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl text-dark-muted">{project.description}</p>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-dark-surface rounded-2xl border border-dark-border mb-12">
                        <div>
                            <div className="text-sm text-dark-muted mb-1">Year</div>
                            <div className="font-medium">{project.year}</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-1">Category</div>
                            <div className="font-medium">{project.category}</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-1">Role</div>
                            <div className="font-medium">Lead Designer</div>
                        </div>
                        <div>
                            <div className="text-sm text-dark-muted mb-1">Duration</div>
                            <div className="font-medium">3 Months</div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-display font-semibold mb-4">Overview</h2>
                            <p className="text-dark-muted leading-relaxed">
                                This project involved a complete redesign of the user experience,
                                focusing on creating an intuitive and visually appealing interface.
                                The goal was to improve user engagement and streamline the core
                                user flows while maintaining brand consistency.
                            </p>
                        </section>

                        {/* Challenge */}
                        <section>
                            <h2 className="text-2xl font-display font-semibold mb-4">The Challenge</h2>
                            <p className="text-dark-muted leading-relaxed">
                                The existing product had grown organically over time, resulting in
                                an inconsistent user experience and declining engagement metrics.
                                Users were having difficulty completing key tasks, and the visual
                                design felt outdated compared to competitors.
                            </p>
                        </section>

                        {/* Solution */}
                        <section>
                            <h2 className="text-2xl font-display font-semibold mb-4">The Solution</h2>
                            <p className="text-dark-muted leading-relaxed">
                                We conducted extensive user research to understand pain points,
                                created a comprehensive design system, and implemented a phased
                                rollout strategy. The new design reduced task completion time by
                                40% and increased user satisfaction scores by 25%.
                            </p>
                        </section>

                        {/* Results */}
                        <section>
                            <h2 className="text-2xl font-display font-semibold mb-4">Results</h2>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-dark-surface rounded-2xl border border-dark-border">
                                    <div className="text-3xl font-display font-bold gradient-text mb-2">40%</div>
                                    <div className="text-sm text-dark-muted">Faster Task Completion</div>
                                </div>
                                <div className="text-center p-6 bg-dark-surface rounded-2xl border border-dark-border">
                                    <div className="text-3xl font-display font-bold gradient-text mb-2">25%</div>
                                    <div className="text-sm text-dark-muted">Higher Satisfaction</div>
                                </div>
                                <div className="text-center p-6 bg-dark-surface rounded-2xl border border-dark-border">
                                    <div className="text-3xl font-display font-bold gradient-text mb-2">60%</div>
                                    <div className="text-sm text-dark-muted">More Engagement</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 pt-12 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-display font-semibold">Like what you see?</h3>
                            <p className="text-dark-muted">Let's discuss your project</p>
                        </div>
                        <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
                            Get in Touch
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
