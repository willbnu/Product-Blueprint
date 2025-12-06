import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, MapPin, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { submitContact } from '@/lib/supabase';

interface FormData {
    name: string;
    email: string;
    message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
    { icon: MapPin, label: 'Location', value: 'São Paulo, Brazil', href: null },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
];

export default function Contact() {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setSubmitStatus('loading');
        setErrorMessage('');

        try {
            const result = await submitContact(data);

            if (result.success) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
            console.error('Contact form error:', error);
        }
    };

    const isSubmitted = submitStatus === 'success';
    const isLoading = submitStatus === 'loading';
    const hasError = submitStatus === 'error';

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
                            <div className="card p-8 text-center" role="alert" aria-live="polite">
                                <div className="w-16 h-16 rounded-full bg-green-500/20
                              flex items-center justify-center mx-auto mb-4">
                                    <Send size={24} className="text-green-500" aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl font-display font-semibold mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-dark-muted">
                                    Thanks for reaching out. I'll get back to you soon.
                                </p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="mt-6 text-accent-purple hover:text-accent-pink transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="card p-8 space-y-6"
                                aria-label="Contact form"
                                noValidate
                            >
                                {/* Error Alert */}
                                {hasError && (
                                    <div
                                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
                                        <p className="text-red-400 text-sm">{errorMessage}</p>
                                    </div>
                                )}

                                {/* Name Field */}
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                                        Name <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        autoComplete="name"
                                        aria-required="true"
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                        disabled={isLoading}
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                                            focus:border-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple/20
                                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <span id="name-error" className="text-red-500 text-sm mt-1 block" role="alert">
                                            {errors.name.message}
                                        </span>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                                        Email <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        disabled={isLoading}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                                            focus:border-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple/20
                                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <span id="email-error" className="text-red-500 text-sm mt-1 block" role="alert">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                                        Message <span className="text-red-500" aria-hidden="true">*</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        aria-required="true"
                                        aria-invalid={errors.message ? 'true' : 'false'}
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                        disabled={isLoading}
                                        {...register('message', { required: 'Message is required' })}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl
                                            focus:border-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple/20
                                            transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && (
                                        <span id="message-error" className="text-red-500 text-sm mt-1 block" role="alert">
                                            {errors.message.message}
                                        </span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary w-full flex items-center justify-center gap-2
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-busy={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} aria-hidden="true" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
