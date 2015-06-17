'use strict';

var cli = require('heroku-cli-util');
var columnify = require('columnify');
var _ = require('lodash');

function listSlugs(context, heroku) {
  return heroku.get(`/apps/${context.app}/releases`).then(onResponse);

  function onResponse(builds) {
    if (context.flags.num) {
      var maxRows = parseInt(context.flags.num);
    } else {
      var maxRows = 10;
    }

    var columnData = _.slice(_.reduce(_.sortBy(builds, 'version').reverse(), iterator, []), 0, maxRows);

    console.log(columnify(columnData));

    function iterator(result, item, index) {
      result.push({
        version: item.version,
        description: item.description,
        slug: (item.slug || {}).id
      });

      return result;
    }
  }
}

module.exports = function(topic) {
  return {
    topic: topic,
    help: 'list slug releases',
    needsApp: true,
    needsAuth: true,
    flags: [
      {
        name: 'num',
        description: 'number of releases to show',
        hasValue: true
      }
    ],
    run: cli.command(listSlugs)
  };
};
