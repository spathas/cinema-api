const Title = require('../models/titleModel');
const factory = require('./handlerFactory');

exports.getAllTitles = factory.getAll(Title);
exports.getTitle = factory.getOne(Title);
exports.createTitle = factory.createOne(Title);
exports.updateTitle = factory.updateOne(Title);
exports.deleteTitle = factory.deleteOne(Title);
