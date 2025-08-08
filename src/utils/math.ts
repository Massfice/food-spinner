import type { Position } from '../types';

/**
 * Get the angle of a point relative to the center of a circle.
 *
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @param {Position} center - The center of the circle.
 * @returns {number} The angle of the point relative to the center of the circle.
 */
export const getAngle = (
    x: number,
    y: number,
    center: Position,
): number => {
    const formalizedX = x - center.x;
    const formalizedY = y - center.y;

    return Math.atan2(formalizedY, formalizedX);
};

/**
 * Ease out cubic function.
 *
 * @param {number} t - The time to ease out.
 * @returns {number} The eased time.
 */
export const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
};

/**
 * Round a number to a fixed number of decimal places.
 *
 * @param {number} number - The number to round.
 * @param {number} precision - The number of decimal places to round to.
 * @returns {number} The rounded number.
 */
export const round = (
    number: number,
    precision: number,
): number => {
    const roundedNumber = parseFloat(
        number.toFixed(precision),
    );

    const isMinusZero =
        roundedNumber === 0 ||
        (roundedNumber < 0 && roundedNumber > -1);

    return isMinusZero
        ? Math.abs(roundedNumber)
        : roundedNumber;
};

/**
 * Move a point around a circle.
 *
 * Takes a point's current position and calculates its new position after rotating
 * around a circle by a specified amount. The rotation is smoothed using an easing
 * function to create natural movement animations.
 *
 * The function calculates the point's current angle relative to the circle center,
 * applies the rotation with easing, and returns the new coordinates on the circle.
 *
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @param {number} totalRotation - The total rotation of the point.
 * @param {number} easedT - The eased time.
 * @param {Position} center - The center of the circle.
 * @param {number} radius - The radius of the circle.
 * @return {Position} The new position of the point.
 */
export const movePoint = (
    x: number,
    y: number,
    totalRotation: number,
    easedT: number,
    center: Position,
    radius: number,
): Position => {
    const currentAngle = getAngle(x, y, center);

    const movingAngle = totalRotation * easedT;

    const newAngle = currentAngle + movingAngle;

    const newPosition: Position = {
        x: center.x + radius * Math.cos(newAngle),
        y: center.y + radius * Math.sin(newAngle),
    };

    return newPosition;
};
