const Discord = require("discord.js");
const fs = require('fs');
const utils = require('../utils/utils.js');

module.exports.run = async (bot, message, args) => {
    fs.readFile('config.json', 'utf-8', function(err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        if (data["bidders_win_number"] == null) return message.channel.send("Sorry, no bidding currently!");

        let id = message.member.user.id

        fs.readFile('savefiles/bidders.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data[id] == null) return message.channel.send("Sorry, no bids!");

            if (data[id]["old"] == null) return message.channel.send("No previous bid!");
            data[id]["actual"] = data[id]["old"]
            data[id]["old"] = null

            if (data[id]["old_rank"] == null) return message.channel.send("No previous bid!");
            data[id]["rank"] = data[id]["old_rank"]
            data[id]["old_rank"] = null

            let old = data[id]["actual"]
            data = JSON.stringify(data, null, 4);
            fs.writeFile('savefiles/bidders.json', data, function(err) {
                if (err) throw err;
                return message.channel.send(message.author.toString() + " your bid was reverted to x" + old);
            })
        })
    })
}

module.exports.config = {
    name: "biderror",
    description: "Return to your previous bid, abuse can be punishable",
    usage: "?biderror",
    accessableby: "Members",
    aliases: ["berr"]
}
