'use strict';

const Botkit = require('botkit');
const Promise = require('bluebird');
const XKCD = require('xkcd-cli');
const _ = require('lodash');

const IGNORED_WORDS = ['@xkcd'];

const controller = Botkit.slackbot({
  json_file_store: './saveData'
});

const bot = controller.spawn({
  token: require('./token.js')
}).startRTM();

controller.on('mention,direct_mention,direct_message', function (bot, message) {
  let words = _.difference(
    _.split(message.text, ' '),
    IGNORED_WORDS
  );
  if (words.length === 0) {
    words = [''];
  }

  XKCD(words, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    var entry = _.sample(result);
    if (entry) {
      bot.reply(message, 'https://xkcd.com/' + entry + '/');
    } else {
      XKCD([''], function(err, result) {
        if (err) {
          console.error(err);
          return;
        }

        var entry = _.sample(result);
        if (entry) {
          bot.reply(message, 'https://xkcd.com/' + entry + '/');
        }
      });
    }
  });
});

// controller.on('mention', function (bot, message) {
//
// });
//
// controller.on('direct_mention', function (bot, message) {
//
// });
//
// controller.on('direct_message', function (bot, message) {
//
// });
