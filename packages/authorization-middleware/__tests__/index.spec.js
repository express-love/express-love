const authorizationMiddleware = require('..');

describe('authorizationMiddleware', () => {
  it('responds when authenticated == true && authorized == true', async () => {
    const isAuthenticated = () => true;
    const isAuthorized = () => true;
    const next = jest.fn();

    authorizationMiddleware({ isAuthenticated, isAuthorized })(
      'req',
      'res',
      next,
    );

    expect(next).toHaveBeenCalled();
  });

  it('responds when authenticated == false && authorized == true', async () => {
    const isAuthenticated = () => false;
    const isAuthorized = () => true;
    const next = jest.fn();

    authorizationMiddleware({ isAuthenticated, isAuthorized })(
      'req',
      'res',
      next,
    );

    expect(next).toHaveBeenCalled();
  });

  it('gets calls the wapped handler when authenticated == true && authorized == false', async () => {
    const isAuthenticated = () => true;
    const isAuthorized = () => false;
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authorizationMiddleware({ isAuthenticated, isAuthorized })(
      'req',
      res,
      next,
    );

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('gets calls the wapped handler when authenticated == false && authorized == false', async () => {
    const isAuthenticated = () => false;
    const isAuthorized = () => false;
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authorizationMiddleware({ isAuthenticated, isAuthorized })(
      'req',
      res,
      next,
    );

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
