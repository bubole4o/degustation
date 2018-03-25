const assert = require('assert');
const app = require('../../src/app');

describe('\'wine\' service', () => {
  it('registered the service', () => {
    const service = app.service('wine');

    assert.ok(service, 'Registered the service');
  });
});
