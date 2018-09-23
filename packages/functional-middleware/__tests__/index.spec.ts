import functionalHandler from '..';

describe('functionalHandler', () => {
  it('gets a response object created by the specified handler', async () => {
    const createResponse = jest.fn();

    await functionalHandler({ createResponse, sendResponse: jest.fn() })(
      'req' as any,
      'res' as any,
      'next' as any,
    );

    expect(createResponse).toHaveBeenCalledWith('req');
  });

  it('calls the specified sendResponse function with the response object returned by the handler', async () => {
    const sendResponse = jest.fn();

    await functionalHandler({
      createResponse: () => Promise.resolve({ status: 200 }),
      sendResponse: sendResponse as any,
    })('req' as any, 'res' as any, 'next' as any);

    expect(sendResponse).toHaveBeenCalledWith('res', { status: 200 });
  });

  it('passes the error to express when the specified handler returns a promise that rejects', async () => {
    const error = new Error('whatever');
    const createResponse = () => Promise.reject(error);
    const next = jest.fn();

    await functionalHandler({
      createResponse,
      sendResponse: jest.fn(),
    })('req' as any, 'res' as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
