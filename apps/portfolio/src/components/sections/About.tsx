import { motion } from 'framer-motion';
import { Figma, Code, Palette, Users, Zap, Heart } from 'lucide-react';

const skills = [
    { name: 'Figma', icon: Figma },
    { name: 'Prototyping', icon: Code },
    { name: 'Visual Design', icon: Palette },
    { name: 'User Research', icon: Users },
    { name: 'Design Systems', icon: Zap },
    { name: 'Accessibility', icon: Heart },
];

const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' },
    { value: '99%', label: 'Client Satisfaction' },
];

export default function About() {
    return (
        <section id="about" className="py-32 bg-dark-surface/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image/Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden border border-dark-border">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 
                          bg-gradient-to-br from-accent-purple/30 to-accent-pink/30 
                          rounded-3xl blur-3xl -z-10" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title mb-6">About Me</h2>
                        <p className="text-lg text-dark-muted mb-6 leading-relaxed">
                            I'm a Product Designer with a passion for creating digital experiences
                            that make a real difference in people's lives. With over 5 years of
                            experience, I've worked with startups and enterprises to bring their
                            visions to life.
                        </p>
                        <p className="text-lg text-dark-muted mb-8 leading-relaxed">
                            My approach combines user-centered design principles with a deep
                            understanding of business goals. I believe that the best designs
                            are those that are both beautiful and functional.
                        </p>

                        {/* Skills */}
                        <div className="mb-10">
                            <h3 className="text-xl font-display font-semibold mb-4">Skills & Tools</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-2 px-4 py-2 
                             bg-dark-bg border border-dark-border rounded-full
                             hover:border-accent-purple transition-colors"
                                    >
                                        <skill.icon size={16} className="text-accent-purple" />
                                        <span className="text-sm">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Download Resume */}
                        <a href="#" className="btn-outline inline-flex items-center gap-2">
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-dark-muted">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
