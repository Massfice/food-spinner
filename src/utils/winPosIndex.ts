/**
 * Calculate the winning position index.
 *
 * @param {number} count - The number of positions.
 * @returns {number | null} The winning position index.
 */
export const winPosIndex = (
    count: number,
): number | null => {
    if (count === 0) {
        return null;
    }

    if (count === 1) {
        return 0;
    }

    const winningPositionIndex = Math.ceil(count / 2);

    return winningPositionIndex;
};
