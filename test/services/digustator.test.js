const assert = require('assert');
const app = require('../../src/app');

describe('\'digustator\' service', () => {
  it('registered the service', () => {
    const service = app.service('digustator');

    assert.ok(service, 'Registered the service');
  });
});
