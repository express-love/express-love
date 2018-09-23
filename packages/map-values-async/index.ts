/**
 * Creates a shallow clone of the specified `source` object. Any properties of
 * the source object that are promises will be replaced with the resolved value.
 *
 * @example
 * const result = await mapValuesAsync({
 *   a: Promise.resolve('apples'),
 *   b: Promise.resolve('bananas'),
 *   c: 'corn',
 * });
 *
 * expect(result).toEqual({
 *   a: 'apples',
 *   b: 'bananas',
 *   c: 'corn',
 * });
 *
 * @returns A clone of `source` with the promise properties replaced with their resolved values.
 */
export default async function mapValuesAsync(
  /**
   * An object with properties that might be promises.
   */
  source: { [key: string]: any },
) {
  const keys = Object.keys(source);
  const values = await Promise.all(keys.map(key => source[key]));
  return zipObject(keys, values);
}

/**
 * @returns an object composed from key-value pairs.
 */
function zipObject<T extends any>(
  /**
   * Property identifiers.
   */
  keys: string[],
  /**
   * Corresponding values.
   */
  values: T[],
) {
  return keys.reduce(
    (result, key, i) => {
      result[key] = values[i];
      return result;
    },
    {} as { [key: string]: T },
  );
}
