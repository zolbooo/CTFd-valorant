export function pickRandom<T>(
  ...possibleValues: { value: T; weight: number }[]
): T {
  const totalWeight = possibleValues.reduce(
    (total, { weight }) => total + weight,
    0
  );

  const randomValue = Math.random() * totalWeight;
  let currentWeight = 0;
  for (const { value, weight } of possibleValues) {
    currentWeight += weight;
    if (randomValue < currentWeight) {
      return value;
    }
  }

  throw new Error("Expected to pick a value, but none was found.");
}
