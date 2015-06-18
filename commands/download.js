'use strict';

var cli = require('heroku-cli-util');
var request = require('request');
var fs = require('fs');

function downloadSlug(context, heroku) {
  heroku.get(`/apps/${context.app}/slugs/${context.args.slug}`).then(onResponse);

  function onResponse(slug) {
    console.log(`Downloading as ${context.args.slug}.tgz`);
    request(slug.blob.url).pipe(fs.createWriteStream(`${context.args.slug}.tgz`));
  }
}

module.exports = function(topic) {
  return {
    topic: topic,
    command: 'download',
    help: 'download slug by slug id',
    needsApp: true,
    needsAuth: true,
    args: [
      {
        name: 'slug',
        description: 'id of slug'
      }
    ],
    run: cli.command(downloadSlug)
  };
};
