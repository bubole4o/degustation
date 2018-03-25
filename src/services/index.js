const digustator = require('./digustator/digustator.service.js');
const wine = require('./wine/wine.service.js');
const marks = require('./marks/marks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(digustator);
  app.configure(wine);
  app.configure(marks);
};
