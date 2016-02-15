
const Botkit = require('botkit');
const Promise = require('bluebird');
const XKCD = require('xkcd-cli');
const _ = require('lodash');

const IGNORED_WORDS = ['xkcd', '@xkcd'];

const controller = Botkit.slackbot({
  json_file_store: './saveData'
});

const bot = controller.spawn({
  token: require('./token.js')
}).startRTM();

controller.on('mention,direct_mention,direct_message', function (bot, message) {
  console.log(JSON.stringify(message));
  const words = _.difference(
    _.split(message.text, ' '),
    IGNORED_WORDS
  );
  console.log(words);

  XKCD(words, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
    bot.reply(message, JSON.stringify(result));
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
