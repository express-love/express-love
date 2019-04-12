# express-love

These packages contain functions I've found helpful for implementing api
endpoints with express. They are documented by package:

* [authorization-middleware](packages/authorization-middleware)
* [functional-middleware](packages/functional-middleware)
* [functional-responses](packages/functional-responses)
* [map-values-async](packages/map-values-async)

Here's an example of using them all together:

```javascript
const express = require('express');
const authorizationMiddleware = require('@express-love/authorization-middleware');
const functionalMiddleware = require('@express-love/functional-middleware');
const responses = require('@express-love/functional-responses');
const mapValuesAsync = require('@express-love/map-values-async');
const permissions = require('./permissions');
const db = require('./db');

// The authorization-middleware package makes it easy to implement auth checks.
// My app is free to implement authorization/authentication any way I want to.
const demandPermission = permission =>
  authorizationMiddleware({
    isAuthenticated: req => !!req.session.identity,
    isAuthorized: req => permissions.has(req.session.identity, permission),
  });

// The functional-handler and functional-responses packages let me express
// endpoints as functions that return values.
const apiHandler = createResponse =>
  functionalMiddleware({ createResponse, sendResponse: responses.send });

function createExamplesRouter() {
  const router = express.Router();

  router.get(
    '/api/examples',
    demandPermission('GET_EXAMPLES'),
    apiHandler(async (req) => {
      // the map-values-async package helps when I have
      // several independent async things to do
      const body = await mapValuesAsync({
        examples: db.getExamples(),
        comments: db.getComments(),
      });
      return responses.ok(body);
    }),
  );

  router.post(
    '/api/examples',
    demandPermission('POST_EXAMPLES'),
    apiHandler(async (req) => {
      if (!req.body) {
        return responses.badRequest({
          errors: ['BODY_MISSING'],
        });
      }

      const example = await db.createExample(req.body);
      return responses.ok({
        examples: [example],
      });
    }),
  );

  return router;
}
```