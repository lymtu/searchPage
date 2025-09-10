const a = -0.00005;
const maxScale = 1.6;
const o = 0;


export const animationCurve = (props) => {
    const b = -2 * a * o;
    const y = a * props ** 2 + b * props + maxScale + b ** 2 / (4 * a);
    return y < 1 ? 1 : y;
}
