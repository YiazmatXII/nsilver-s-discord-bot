const Discord = require("discord.js");
const botconfig = require("../config.json");
const fs = require('fs');
const utils = require('../utils/utils.js');

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (args.length < 1) return message.channel.send("You need to enter at least an id!");
        parse = check_number_args(args)
        if (parse != null) return message.channel.send(parse + " is not a number!");

        fs.readFile('savefiles/rafflers.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data == null) {
                data = {}
            }
            last_winners = []
            for (arg of args) {
                last_winners.push(arg)
            }
            data["last_winners"] = last_winners
            data = JSON.stringify(data, null, 4);
            fs.writeFile('savefiles/rafflers.json', data, function(err) {
                if (err) throw err;
                return message.channel.send(message.author.toString() + " all data correctly added");
            })
        })
    }
}

function check_number_args(args) {
    for (arg of args) {
        if (!utils.isNumber(arg)) return arg;
    }
    return null
}

module.exports.config = {
    name: "add_previous_winner",
    description: "Erase the previous raffle winners list and create a new one with arguments.",
    usage: "?add_previous_winner [id1] <id2> ...",
    accessableby: "Admin",
    aliases: ["apw"]
}
