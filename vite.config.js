import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            // ssr: 'resources/js/ssr.js',
            publicDirectory: 'public',
            buildDirectory: 'build',
            refresh: true,
        }),
        solid(),
        // solid({ ssr: true }),
    ],
    build: {
        manifest: true, // Generate manifest.json file
        outDir: 'public/build',
        rollupOptions: {
            input: 'resources/js/app.js',
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
                manualChunks: undefined, // Disable automatic chunk splitting
            },
        },
    },
    server: {
        hmr: {
            host: 'localhost',
        },
    },
});
