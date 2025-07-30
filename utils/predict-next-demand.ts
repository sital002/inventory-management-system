export function predictNextDayDemand(
    productSales: Record<string, number[]>
): Array<{ productName: string; last5Days: number[]; predicted: number; sellUnit: number[] }> {
    const weights = [1, 2, 3, 4, 5];
    const weightSum = weights.reduce((sum, w) => sum + w, 0);

    const result: Array<{ productName: string; last5Days: number[]; predicted: number; sellUnit: number[] }> = [];

    for (const [productName, sales] of Object.entries(productSales)) {
        const last5Days = sales.slice(-5);
        const weightedTotal = last5Days.reduce(
            (sum, units, index) => sum + units * weights[index],
            0
        );
        const predicted = Math.round(weightedTotal / weightSum);

        result.push({
            productName,
            last5Days,
            predicted,
            sellUnit: last5Days
        });
    }

    return result;
}
