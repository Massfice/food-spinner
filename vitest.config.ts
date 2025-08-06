import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/experimental-vitest-plugin';

export default defineConfig({
    plugins: [
        react(),
        storybookTest({
            renderer: 'react',
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./.storybook/vitest.setup.ts'],
        include: [
            'src/stories/**/*.stories.tsx',
            'test/**/*.spec.ts',
        ],
    },
    define: {
        global: 'globalThis',
    },
});
