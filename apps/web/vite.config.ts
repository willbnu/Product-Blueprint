import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            TanStackRouterVite({
                routesDirectory: './src/routes',
                generatedRouteTree: './src/routeTree.gen.ts',
            }),
            react(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@pb/shared': path.resolve(__dirname, '../../libs/shared/src'),
                '@pb/data': path.resolve(__dirname, '../../libs/data/src'),
                '@pb/state': path.resolve(__dirname, '../../libs/state/src'),
            },
        },
        define: {
            // Make Vite env vars available as process.env for shared libs compatibility
            'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
            'process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
        },
        server: {
            port: 3000,
            open: true,
        },
    };
});
