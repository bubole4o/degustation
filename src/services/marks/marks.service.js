// Initializes the `marks` service on path `/marks`
const createService = require('feathers-nedb');
const createModel = require('../../models/marks.model');
const hooks = require('./marks.hooks');
const filters = require('./marks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'marks',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/marks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('marks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
