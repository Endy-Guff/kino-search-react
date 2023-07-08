export const numstr = (n: number) => {
    const minutes = ['минута', 'минуты', 'минут']

    let m = Math.abs(n) % 100;
    let n1 = m % 10;
    if (m > 10 && m < 20) {
        return `${n} ${minutes[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
        return `${n} ${minutes[1]}`;
    }
    if (n1 == 1) {
        return `${n} ${minutes[0]}`;
    }
    return `${n} ${minutes[2]}`;
}