import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function Projects() {
    return (
        <section id="work" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="section-title mb-4">Selected Work</h2>
                    <p className="text-xl text-dark-muted max-w-2xl">
                        A collection of projects where I've helped brands create
                        meaningful digital experiences.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/project/${project.id}`} className="group block">
                                <div className="card overflow-hidden">
                                    {/* Project Image */}
                                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.color} overflow-hidden`}>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 
                               group-hover:scale-105 group-hover:opacity-100
                               transition-all duration-700"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-dark-bg/60 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300
                                  flex items-center justify-center">
                                            <div className="w-14 h-14 rounded-full bg-white text-dark-bg
                                    flex items-center justify-center
                                    transform scale-0 group-hover:scale-100
                                    transition-transform duration-300">
                                                <ArrowUpRight size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-accent-purple font-medium">
                                                {project.category}
                                            </span>
                                            <span className="text-sm text-dark-muted">{project.year}</span>
                                        </div>
                                        <h3 className="text-2xl font-display font-semibold mb-2 
                                 group-hover:text-accent-purple transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-dark-muted">{project.description}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-3 py-1 rounded-full 
                                   bg-dark-bg border border-dark-border text-dark-muted"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
