export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    color: string;
    year: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: 'fintech-app',
        title: 'Fintech Mobile App',
        description: 'Redesigning the mobile banking experience for Gen Z users',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
        color: 'from-blue-500/20 to-cyan-500/20',
        year: '2024',
        tags: ['UX Research', 'UI Design', 'Prototyping'],
    },
    {
        id: 'saas-dashboard',
        title: 'Analytics Dashboard',
        description: 'Data visualization platform for enterprise clients',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        color: 'from-purple-500/20 to-pink-500/20',
        year: '2024',
        tags: ['Dashboard', 'Data Viz', 'B2B'],
    },
    {
        id: 'ecommerce-redesign',
        title: 'E-commerce Redesign',
        description: 'Complete overhaul of shopping experience for fashion brand',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        color: 'from-orange-500/20 to-red-500/20',
        year: '2023',
        tags: ['E-commerce', 'Conversion', 'Mobile First'],
    },
    {
        id: 'health-app',
        title: 'Health & Wellness App',
        description: 'Mental health companion app with mood tracking',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        color: 'from-green-500/20 to-teal-500/20',
        year: '2023',
        tags: ['Healthcare', 'UX Research', 'Accessibility'],
    },
];
