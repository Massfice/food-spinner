/**
 * Convert percentages to pixels.
 * This is needed, because tests running in Storybook converts percentages to pixels.
 * For tests running using Vitest, we want to keep the percentages.
 *
 * @param {string} value - The value to convert.
 * @param {number} widthOrHeight - The width or height of the container.
 * @returns {string} The converted value.
 */
export const convertPercents = (
    value: string,
    widthOrHeight: number,
): string => {
    // no need to convert
    if (value.includes('px')) {
        return value;
    }

    // Vitest
    if (typeof process !== 'undefined') {
        return value;
    }

    // Storybook

    const valueNumber = parseFloat(value.replace('%', ''));

    const ratio = valueNumber / 100;

    return `${ratio * widthOrHeight}px`;
};
