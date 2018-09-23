import authorizationMiddleware from '..';

describe('authorizationMiddleware', () => {
  it('responds when authenticated == true && authorized == true', () => {
    const next = jest.fn();

    authorizationMiddleware({
      isAuthenticated: () => true,
      isAuthorized: () => true,
    })('req' as any, 'res' as any, next);

    expect(next).toHaveBeenCalled();
  });

  it('responds when authenticated == false && authorized == true', () => {
    const next = jest.fn();

    authorizationMiddleware({
      isAuthenticated: () => false,
      isAuthorized: () => true,
    })('req' as any, 'res' as any, next);

    expect(next).toHaveBeenCalled();
  });

  it('gets calls the wapped handler when authenticated == true && authorized == false', () => {
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authorizationMiddleware({
      isAuthenticated: () => true,
      isAuthorized: () => false,
    })('req' as any, res as any, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('gets calls the wapped handler when authenticated == false && authorized == false', () => {
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authorizationMiddleware({
      isAuthenticated: () => false,
      isAuthorized: () => false,
    })('req' as any, res as any, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
