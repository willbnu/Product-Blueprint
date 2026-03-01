import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

export default defineConfig({
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
    server: {
        port: 3000,
        open: true,
    },
});
