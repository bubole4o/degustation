const assert = require('assert');
const app = require('../../src/app');

describe('\'marks\' service', () => {
  it('registered the service', () => {
    const service = app.service('marks');

    assert.ok(service, 'Registered the service');
  });
});
