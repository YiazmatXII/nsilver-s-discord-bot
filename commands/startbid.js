const botconfig = require("../config.json");
const fs = require('fs');
const utils = require('../utils/utils.js')

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if(!args[0] || args[0] % 1 || !utils.isNumber(args[0])) return message.channel.send("Please give me a valid number!");
        fs.readFile('config.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data["bidders_win_number"] != null) return message.channel.send("A bidding already started!");
            data["bidders_win_number"] = Number(args[0])

            data = JSON.stringify(data, null, 4);

            fs.writeFile('config.json', data, function(err) {
                if (err) throw err
                return message.channel.send("Bidding Started! <@&"+ botconfig.bidderid + ">");
            })
            return;
        })
    }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

module.exports.config = {
    name: "startbid",
    description: "Start a bidding for Nsilver's commissions",
    usage: "?startbid [number]",
    accessableby: "Admin",
    aliases: ["sb"]
}
