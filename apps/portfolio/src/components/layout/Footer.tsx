import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Dribbble', icon: Dribbble, href: 'https://dribbble.com' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
];

export default function Footer() {
    return (
        <footer className="border-t border-dark-border py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <span className="text-xl font-display font-bold gradient-text">
                            Portfolio
                        </span>
                        <p className="text-dark-muted text-sm mt-2">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-dark-border 
                         flex items-center justify-center text-dark-muted
                         hover:border-accent-purple hover:text-accent-purple
                         transition-all duration-300"
                                aria-label={link.name}
                            >
                                <link.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
