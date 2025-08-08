import type { Meta, StoryObj } from '@storybook/react';
import { ProductInfo } from '../components/ProductInfo';

const meta: Meta<typeof ProductInfo> = {
    title: 'Components/ProductInfo',
    component: ProductInfo,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        color: {
            control: { type: 'color' },
        },
    },
};

export default meta;

export const Default: StoryObj<typeof ProductInfo> = {
    args: {
        name: 'Product Name',
        price: 100,
        description: 'Product Description',
        color: '#c72d1e',
    },
};

export const WithLongNameAndDescription: StoryObj<
    typeof ProductInfo
> = {
    args: {
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare sem ac erat pharetra, eget interdum justo sagittis. Curabitur quis lectus ullamcorper, mollis nunc ac, finibus ante.',
        price: 100,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare sem ac erat pharetra, eget interdum justo sagittis. Curabitur quis lectus ullamcorper, mollis nunc ac, finibus ante. Ut aliquet a nulla eget cursus. Vivamus rhoncus, ex hendrerit porttitor aliquet, ipsum est elementum enim, id rutrum arcu ligula a velit. Suspendisse fermentum gravida orci, quis tempus nibh euismod in. Duis a eros consequat lacus laoreet porta. Aliquam efficitur vestibulum dui, nec tempor orci. Cras aliquet sed ex eu suscipit. Phasellus dictum, ante at suscipit commodo, diam magna laoreet dui, sit amet tincidunt nisi tellus id urna. Morbi laoreet vehicula mattis. Mauris ac erat nec purus efficitur maximus. Nunc malesuada risus accumsan eros malesuada iaculis. Suspendisse potenti. Donec at sodales orci, eget tincidunt nisl. Etiam aliquet magna eget vehicula pulvinar. Nullam non neque risus.

Cras quis lacinia dui. Quisque luctus ligula nec dolor viverra dictum. In sodales malesuada sem sed mollis. In accumsan in dui quis ultrices. Integer volutpat lorem sit amet massa lacinia vulputate. Aliquam blandit augue eget nulla elementum consectetur. Sed eget vehicula magna. Nunc sed lacus ac ex laoreet tristique at vel magna. Aliquam blandit a ex eget dapibus. Vestibulum sit amet tempor arcu, ac interdum ligula. Suspendisse finibus erat aliquam dictum scelerisque. Duis accumsan, mauris sed placerat semper, augue massa tincidunt sem, ut luctus nulla lacus sed metus.

Suspendisse viverra tortor in bibendum venenatis. Phasellus vitae nisi vel lacus rutrum ornare. Nulla facilisi. Phasellus eget arcu faucibus, sollicitudin libero eu, tincidunt nibh. Morbi ac porttitor nulla, nec congue nunc. Proin ultrices tincidunt urna sed fringilla. Nulla ut velit at mi convallis sollicitudin. Proin scelerisque porta rutrum. Nam commodo nisi id nunc laoreet, at volutpat dolor varius. Phasellus ut eleifend urna. Donec elementum odio quis vulputate lobortis. Aenean non arcu volutpat, scelerisque massa nec, lobortis nisl. Aliquam lorem est, placerat sed aliquet sit amet, porta eu dui.`,
        color: '#c72d1e',
    },
};
