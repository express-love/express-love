const functionalHandler = require('..');

describe('functionalHandler', () => {
  it('gets a response object created by the specified handler', async () => {
    const createResponse = jest.fn();

    await functionalHandler({ createResponse, sendResponse: jest.fn() })(
      'req',
      'res',
      'next',
    );

    expect(createResponse).toHaveBeenCalledWith('req');
  });

  it('calls the specified sendResponse function with the response object returned by the handler', async () => {
    const createResponse = () => Promise.resolve({ status: 200 });
    const sendResponse = jest.fn();

    await functionalHandler({ createResponse, sendResponse })(
      'req',
      'res',
      'next',
    );

    expect(sendResponse).toHaveBeenCalledWith('res', { status: 200 });
  });

  it('passes the error to express when the specified handler returns a promise that rejects', async () => {
    const error = new Error('whatever');
    const createResponse = () => Promise.reject(error);
    const next = jest.fn();

    await functionalHandler({ createResponse, sendResponse: jest.fn() })(
      'req',
      'res',
      next,
    );

    expect(next).toHaveBeenCalledWith(error);
  });
});
