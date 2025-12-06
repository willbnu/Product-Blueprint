import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, MapPin, Clock } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@example.com' },
    { icon: MapPin, label: 'Location', value: 'São Paulo, Brazil' },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
];

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title mb-6">Let's Work Together</h2>
                        <p className="text-xl text-dark-muted mb-12 leading-relaxed">
                            Have a project in mind? I'd love to hear about it.
                            Let's discuss how we can bring your ideas to life.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-dark-surface border border-dark-border
                                flex items-center justify-center">
                                        <item.icon size={20} className="text-accent-purple" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-muted">{item.label}</div>
                                        <div className="font-medium">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {isSubmitted ? (
                            <div className="card p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 
                              flex items-center justify-center mx-auto mb-4">
                                    <Send size={24} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-display font-semibold mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-dark-muted">
                                    Thanks for reaching out. I'll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                             focus:border-accent-purple focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                             focus:border-accent-purple focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        {...register('message', { required: 'Message is required' })}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                             focus:border-accent-purple focus:outline-none transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && (
                                        <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
