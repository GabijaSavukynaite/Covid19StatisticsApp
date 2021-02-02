export const groupBy = <T>(
  array: Array<T>,
  property: (x: T) => string
): { [key: string]: Array<T> } =>
  array.reduce((acc: { [key: string]: Array<T> }, x: T) => {
    if (!acc[property(x)]) {
      acc[property(x)] = [];
    }
    acc[property(x)].push(x);
    return acc;
  }, {});
