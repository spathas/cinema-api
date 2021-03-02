"use strict";

var Hall = require('../models/hallModel');

var factory = require('./handlerFactory');

exports.getAllHalls = factory.getAll(Hall);
exports.getHall = factory.getOne(Hall);
exports.createHall = factory.createOne(Hall);
exports.updateHall = factory.updateOne(Hall);
exports.deleteHall = factory.deleteOne(Hall);
//# sourceMappingURL=hallController.dev.js.map
