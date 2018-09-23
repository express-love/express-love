import mapValuesAsync from '..';

describe('mapValuesAsync', () => {
  it('returns the specified object after resolving any properties that are promises', async () => {
    const result = await mapValuesAsync({
      a: Promise.resolve('apples'),
      b: Promise.resolve('bananas'),
      c: 'corn',
    });

    expect(result).toEqual({
      a: 'apples',
      b: 'bananas',
      c: 'corn',
    });
  });
});
