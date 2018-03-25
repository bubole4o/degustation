// Initializes the `digustator` service on path `/digustator`
const createService = require('feathers-nedb');
const createModel = require('../../models/digustator.model');
const hooks = require('./digustator.hooks');
const filters = require('./digustator.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'digustator',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/digustator', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('digustator');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
