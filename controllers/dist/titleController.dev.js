"use strict";

var Title = require('../models/titleModel');

var factory = require('./handlerFactory');

exports.getAllTitles = factory.getAll(Title);
exports.getTitle = factory.getOne(Title);
exports.createTitle = factory.createOne(Title);
exports.updateTitle = factory.updateOne(Title);
exports.deleteTitle = factory.deleteOne(Title);
//# sourceMappingURL=titleController.dev.js.map
