const params = require("./params.json");
const Person = require('./Person.js');

const mongojs = require('mongojs')
const lineReader = require('line-reader');
const TelegramBot = require('node-telegram-bot-api');

const db = mongojs(params.mongo.dbName, [params.mongo.collectionName])
const mycollection = db.collection(params.mongo.collectionName)
const bot = new TelegramBot(params.telegram.token, { polling: true });

var lineCtr = 0;
var lineCtrLogLength = 10000;

db.mycollection.remove({}, function (err) {
    // before adding all, remove all
    lineReader.eachLine(params.sqlFileDir, function (line, last) {
        mycollection.save(new Person(line), function (err, saved) {
            if (++lineCtr % lineCtrLogLength == 0) {
                console.log((lineCtr).toString() + " of 49611709 saved");
            }
            if (last) {
                console.log("reading finished");
            }
        })
    });
});

// bot functions
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});

