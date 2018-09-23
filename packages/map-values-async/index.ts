/**
 * Creates a shallow clone of the specified `source` object. Any properties of
 * the source object that are promises will be replaced with the resolved value.
 *
 * @param {Object} source An object with properties that might be promises
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
 * @returns {Object} A clone of `source` with the promise properties replaced with their
 */
async function mapValuesAsync(source) {
  const keys = Object.keys(source);
  const values = await Promise.all(keys.map(key => source[key]));
  return zipObject(keys, values);
}

function zipObject(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) result[keys[i]] = values[i];
  return result;
}

module.exports = mapValuesAsync;
