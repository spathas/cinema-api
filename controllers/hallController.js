const Hall = require('../models/hallModel');
const factory = require('./handleFactory');

exports.getAllHalls = factory.getAll(Hall);
exports.getHall = factory.getOne(Hall);
exports.createHall = factory.createOne(Hall);
exports.updateHall = factory.updateOne(Hall);
exports.deleteHall = factory.deleteOne(Hall);
