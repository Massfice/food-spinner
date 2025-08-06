import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as addonAnnotations from '@storybook/addon-a11y/preview';
import * as previewAnnotations from './preview';

const annotations = setProjectAnnotations([
    previewAnnotations,
    addonAnnotations,
]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
