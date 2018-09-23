import { Response } from 'express';

import * as responses from '..';

describe('responses.ok', () => {
  it('returns status 200', () => {
    const result = responses.ok();

    expect(result).toEqual({ status: 200 });
  });

  it('returns an optional body', () => {
    const result = responses.ok('hello world');

    expect(result).toEqual({ status: 200, body: 'hello world' });
  });
});

describe('responses.badRequest', () => {
  it('returns status 400', () => {
    const result = responses.badRequest();

    expect(result).toEqual({ status: 400 });
  });

  it('returns an optional list of errors', () => {
    const result = responses.badRequest(['ERROR_1', 'ERROR_2']);

    expect(result).toEqual({
      body: ['ERROR_1', 'ERROR_2'],
      status: 400,
    });
  });
});

describe('responses.unauthorized', () => {
  it('returns status 200', () => {
    const result = responses.unauthorized();

    expect(result).toEqual({ status: 401 });
  });
});

describe('responses.forbidden', () => {
  it('returns status 200', () => {
    const result = responses.forbidden();

    expect(result).toEqual({ status: 403 });
  });
});

describe('responses.setHeaders', () => {
  it('adds headers to a reponse', () => {
    let response = responses.ok();
    response = responses.setHeaders(response, { header1: 'value 1' });
    expect(response.headers).toEqual({
      header1: 'value 1',
    });

    response = responses.setHeaders(response, { header2: 'value 2' });
    expect(response.headers).toEqual({
      header1: 'value 1',
      header2: 'value 2',
    });
  });
});

describe('responses.send', () => {
  function mockExpressResponse() {
    return ({
      send: jest.fn(),
      set: jest.fn(),
      status: jest.fn(),
    } as Partial<Response>) as Response;
  }

  it('calls the status method of the `res` object', () => {
    const res = mockExpressResponse();

    responses.send(res, responses.ok());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('calls the set method of the `res` object', () => {
    const res = mockExpressResponse();

    const response = responses.setHeaders(responses.ok(), {
      sentBy: 'me',
    });

    responses.send(res, response);

    expect(res.set).toHaveBeenCalledWith({ sentBy: 'me' });
  });

  it('calls the send method of the `res` object', () => {
    const res = mockExpressResponse();

    responses.send(res, responses.ok('hello world'));

    expect(res.send).toHaveBeenCalledWith('hello world');
  });

  it('calls the send method of the `res` object when no body is provided', () => {
    const res = mockExpressResponse();

    responses.send(res, responses.ok());

    expect(res.send).toHaveBeenCalledWith('OK');
  });
});
