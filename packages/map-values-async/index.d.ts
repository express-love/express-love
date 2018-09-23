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
export default function mapValuesAsync(
  /**
   * An object with properties that might be promises.
   */
  source: {
    [key: string]: any;
  },
): Promise<{
  [key: string]: any;
}>;
