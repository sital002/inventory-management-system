type ProductResult = {
  name: string;
  avgDailySales: number;
  unitsNeededToday: number;
  revenue: number;
};

export function calculateUnitsForTodayTarget(
  products: any[],
  todayTargetRevenue: number
): ProductResult[] {
  if (!Array.isArray(products) || products.length === 0) return [];

  const avgRevenues = products.map((product) => {
    const name = typeof product.name === "string" ? product.name : "Unknown";
    const price =
      typeof product.sellingPrice === "number" && product.sellingPrice > 0
        ? product.sellingPrice
        : 0;

    const last5Days = Array.isArray(product.last5DaySelling)
      ? product.last5DaySelling.map((e: any) =>
          typeof e?.unit === "number" ? e.unit : 0
        )
      : [];

    const totalUnits = last5Days.reduce((a: any, b: any) => a + b, 0);
    const avgDailyUnits =
      last5Days.length > 0 ? totalUnits / last5Days.length : 0;
    const avgDailyRevenue = avgDailyUnits * price;

    return { name, price, avgDailyUnits, avgDailyRevenue };
  });

  const totalAvgRevenue = avgRevenues.reduce(
    (sum, p) => sum + p.avgDailyRevenue,
    0
  );

  let remainingTarget = todayTargetRevenue;
  const results: ProductResult[] = [];

  avgRevenues.forEach((p, index) => {
    const share = totalAvgRevenue ? p.avgDailyRevenue / totalAvgRevenue : 0;
    let targetRevenue = todayTargetRevenue * share;

    let unitsNeededToday;
    if (index < avgRevenues.length - 1) {
      unitsNeededToday = Math.floor(targetRevenue / p.price);
      remainingTarget -= unitsNeededToday * p.price;
    } else {
      unitsNeededToday = Math.ceil(remainingTarget / p.price); // adjust last product to match target
    }

    results.push({
      name: p.name,
      avgDailySales: parseFloat(p.avgDailyUnits.toFixed(2)),
      unitsNeededToday,
      revenue: unitsNeededToday * p.price,
    });
  });

  return results;
}
