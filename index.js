'use strict';

var pkg = require('./package.json');

const TOPIC = 'slugz';

exports.topic = {
  name: TOPIC,
  description: pkg.description,
};

exports.commands = [
  require('./commands/index.js')(TOPIC)
];
